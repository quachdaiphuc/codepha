<?php

namespace App\Civ3\GithubHelper;

/**
 * Class GithubChangeEvents
 * @package App\Civ3\GithubHelper
 */
class GithubChangeEvents
{
    /**
     * @param $repository
     * @param $client
     * @param $owner
     * @param $eventName
     * @param $type
     */
    public function changeHookEvent($repository, $client, $owner, $eventName, $type)
    {
        $endPoint = 'https://api.github.com/repos/' . $owner->username . '/'.
        $repository->name . '/hooks' . '/' . $repository->hook_id;

        $params = [
            'active' => true,
            $type => [$eventName],
        ];

        $githubResponse = $client->request('PATCH', $endPoint, [
            'headers' => ['Authorization' => 'Bearer ' . $owner->socialite_token],
            \GuzzleHttp\RequestOptions::JSON => $params,
        ]);
    }
}
