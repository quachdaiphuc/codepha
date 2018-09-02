<?php

namespace App\Services\Gitv2\Github\Api;

use App\Services\Gitv2\Contracts\CollaboratorInterface;
use App\Services\Gitv2\Github\GithubClient;
use Github\ResultPager;
use App\Models\User;
use App\Exceptions\CustomException;
use Illuminate\Support\Facades\DB;

class Collaborator extends GithubClient implements CollaboratorInterface
{
    /**
     * Synchonize repository on github with database
     *
     * @param App\Models\Repo $repository - target repository
     *
     * @return void
     */
    public function syncCollaborators($repository)
    {
        $collaborators = $this->getCollaborators($repository->owner, $repository->name);
        if (count($collaborators)) {
            $members = $this->transformCollaborators($collaborators);
            $existsUsers = User::withTrashed()
                ->whereIn('username', array_column($members, 'username'))
                ->get();
            if (count($members) == count($existsUsers)) {
                $this->handleSync($repository, $members);
            } else {
                $newUsers = array_diff(
                    array_column($members, 'username'),
                    $existsUsers->pluck('username')->all()
                );
                $newUsers = $this->transformNewUser($newUsers);
                User::insert($newUsers);
                $this->handleSync($repository, $members);
            }
        }
    }

    /**
     * Get collaborators list of github repository
     *
     * @param string $ownerName - repository's owner name
     * @param string $repository - repository's name
     *
     * @return array
     */
    protected function getCollaborators($ownerName, $repositoryName)
    {
        try {
            $collaborators = $this->client->api('repository')
                ->collaborators()
                ->all($ownerName, $repositoryName);
        } catch (\Exception $e) {
            logger($e);
            throw new CustomException(
                __('messages.repo_not_found'),
                \Symfony\Component\HttpFoundation\Response::HTTP_NOT_FOUND
            );
        }

        return $collaborators;
    }

    /**
     * Transform collaborators list to simple struct
     *
     * @param array $collaborators - list of repository's collaborators
     *
     * @return array
     */
    protected function transformCollaborators($collaborators)
    {
        $result = [];
        foreach ($collaborators as $index => $collaborator) {
            if ($collaborator['permissions']['push']) {
                $result[$index]['username'] = $collaborator['login'];
                $result[$index]['role'] = $collaborator['permissions']['admin'];
            }
        }

        return $result;
    }

    /**
     * Devide repository's collaborators by permission
     *
     * @param array $members - repository's collaboratos list
     *
     * @return array
     */
    protected function extractMemberByRole($members)
    {
        $result = [
            'owner' => [],
            'user' => [],
        ];
        foreach ($members as $member) {
            if ($member['role']) {
                array_push($result['owner'], $member);
            } else {
                array_push($result['user'], $member);
            }
        }
        return $result;
    }

    /**
     * Transform selected users to userRepo model by permission
     *
     * @param array $owners - list of repository owner
     * @param int $permission - permission with repository
     *
     * @return array
     */
    protected function transformByPermission($userGroup, $permission)
    {
        $owners = User::withTrashed()
            ->whereIn('username', array_column($userGroup, 'username'))
            ->get();
        $updatedOwners = $this->mapMemberToModel($owners, $permission);

        return $updatedOwners;
    }

    /**
     * Map array to userRepo model struct
     *
     * @param App\Models\Users $users - user list
     * @param boolean $permission - determine group user permission to repository
     *
     * @return array
     */
    protected function mapMemberToModel($users, $permission)
    {
        $result = [];
        foreach ($users as $user) {
            $result[$user->id]['writeable_permission'] = $permission;
        }

        return $result;
    }

    /**
     * Transform given username list to user model struct
     *
     * @param array $users - username list
     *
     * @return array
     */
    protected function transformNewUser($users)
    {
        $result = [];
        foreach ($users as $key => $username) {
            $result[$key]['username'] = $username;
            $result[$key]['service_type'] = config('const.service_type.github');
        }

        return $result;
    }

    /**
     * Handle synchonize target repository's members with given member list
     *
     * @param App\Models\Repo $repository - target repository
     * @param array $members - collaborator list
     *
     * @return void
     */
    protected function handleSync($repository, $members)
    {
        $extractedMembers = $this->extractMemberByRole($members);
        $updatedOwners = $this->transformByPermission($extractedMembers['owner'], 1);
        $updatedUsers = $this->transformByPermission($extractedMembers['user'], 0);
        $syncMembers = $updatedOwners + $updatedUsers;
        DB::transaction(function () use ($repository, $syncMembers) {
            $repository->users()->sync($syncMembers);
        });
    }
}
