<?php

namespace App\Services\Gitv2\Github\Api;

use App\Services\Gitv2\Contracts\KeyInterface;
use App\Services\Gitv2\Github\GithubClient;
use App\Exceptions\CustomException;
use App\Civ3\RsaKey\RsaKey;
use Illuminate\Support\Facades\Log;

class Key extends GithubClient implements KeyInterface
{
    /**
     * Add deploy key to github repository
     *
     * @param App\Models\Repo $repository - target repository
     *
     * @return void
     */
    public function grantDeployKey($repository)
    {
        $title = auth()->user()->username . '-' . $repository->name . '@codepha';
        $keys = RsaKey::generate($title);

        $begin = '-----BEGIN RSA PRIVATE KEY-----';
        $end = '-----END RSA PRIVATE KEY-----';
        $newKey = str_replace($begin, '', $keys['private']);
        $newKey2 = str_replace($end, '', $newKey);
        $privateKey = '-----BEGIN RSA PRIVATE KEY-----\r\n' .
                      chunk_split($newKey2, 64, '\r\n') .
                      '-----END RSA PRIVATE KEY-----';

        try {
            $this->client
                ->api('repo')
                ->keys()
                ->create(
                    $repository->owner,
                    $repository->name,
                    ['title' => $title, 'key' => $keys['public']]
                );
        } catch (\Exception $e) {
            Log::error([
                'GRANT_DEPLOY_KEY' => [
                    'project_name' => $repository->full_name,
                    'error_trace' => $e->getTraceAsString(),
                ],
            ]);
            throw new CustomException(
                $e->getMessage(),
                \Symfony\Component\HttpFoundation\Response::HTTP_BAD_REQUEST
            );
        }

        $repository->key()->create(['public' => $keys['public'], 'private' => $privateKey]);
    }
}
