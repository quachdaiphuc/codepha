<?php

namespace App\Services\Gitv2\Github\Api;

use App\Services\Gitv2\Contracts\WebhookInterface;
use App\Services\Gitv2\Github\GithubClient;
use App\Exceptions\CustomException;
use Illuminate\Support\Facades\Log;

class Webhook extends GithubClient implements WebhookInterface
{
    /**
     * Create github repository's webook
     *
     * @param App\Models\Repo $repository - target repository
     *
     * @return array
     */
    public function createHook($repository)
    {
        $webhookConfig = config('const.webhook.github');
        try {
            $webhook = $this->client
                ->api('repo')
                ->hooks()
                ->create($repository->owner, $repository->name, $webhookConfig);
        } catch (\Exception $e) {
            Log::error([
                'CREATE_WEBHOOK' => [
                    'project_name' => $repository->full_name,
                    'error_trace' => $e->getTraceAsString(),
                ],
            ]);
            throw new CustomException(
                $e->getMessage(),
                \Symfony\Component\HttpFoundation\Response::HTTP_BAD_REQUEST
            );
        }

        return $webhook;
    }

    /**
     * Change github repository's webook status
     *
     * @param App\Models\Repo $repository - target repository
     * @param string - updated status
     *
     * @return void
     */
    public function updateHook($repository, $status)
    {
        $config = [
            'active' => (boolean) $status,
            'config' => [
                'url' => env('APP_WEBHOOK_ROUTE'),
                'content_type' => 'json',
                'secret' => env('APP_WEBHOOK_SECRET'),
            ],
        ];
        try {
            $this->client
                ->api('repo')
                ->hooks()
                ->update(
                    $repository->owner,
                    $repository->name,
                    $repository->hook_id,
                    $config
                );
        } catch (\Exception $e) {
            throw new CustomException(
                $e->getMessage(),
                \Symfony\Component\HttpFoundation\Response::HTTP_BAD_REQUEST
            );
        }
    }
}
