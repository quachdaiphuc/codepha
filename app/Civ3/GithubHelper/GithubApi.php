<?php

namespace App\Civ3\GithubHelper;

use GuzzleHttp\Client;
use Github\Client as GithubClient;
use App\Exceptions\CustomException;
use App\Civ3\GithubHelper\GithubPayloadDataHelper;
use App\Models\User;
use App\Models\Repo;

class GithubApi
{
    /**
     * Guzzle client object
     *
     * @var GuzzleHttp\Client
     */
    protected $client;

    /**
     * Default request header
     *
     * @var array
     */
    protected $header = [
        'Content-Type' => 'application/json',
        'Accept' => 'application/json',
    ];

    /**
     * Additional data
     *
     * @var array
     */
    protected $attach = null;

    /**
     * Constructor
     */
    public function __construct($additionHeader)
    {
        if (!$additionHeader || !array_key_exists('Authorization', $additionHeader)) {
            throw new InvalidArgumentException('Authorization header not found');
        }

        $additionHeader['Authorization'] = 'Bearer ' . $additionHeader['Authorization'];
        $this->header = array_merge($this->header, $additionHeader);
        $this->client = new Client([
            'base_uri' => 'https://api.github.com/',
            'headers' => $this->header,
        ]);
    }

    /**
     * Create meta data for response
     *
     * @param string $message
     * @param int $statusCode
     *
     * @return array
     */
    private function createMeta($message, $statusCode)
    {
        return [
            'meta' => [
                'message' => [
                    'main' => $message,
                ],
            ],
        ];
    }

    /**
     * Return json response format
     *
     * @param int $statusCode
     * @param string $message
     *
     * @return \Illuminate\Http\JsonResponse
     */
    private function getResponse($statusCode, $message = 'OK')
    {
        $meta = $this->createMeta($message, $statusCode);
        if ($this->attach !== null) {
            $meta['data'] = $this->attach;
            $this->attach = null;
        }

        return response()->json($meta, $statusCode);
    }

    /**
     * Attach data to json response
     *
     * @param array $data
     *
     * @return this
     */
    private function attachData($data)
    {
        $this->attach = $data;

        return $this;
    }

    /**
     * Execute callable callback with try-catch exception
     *
     * @param callable $callback
     *
     * @return \Illuminate\Http\JsonResponse
     */
    private function doAction(callable $callback)
    {
        try {
            if (is_callable($callback)) {
                return call_user_func_array($callback, []);
            }
        } catch (\Exception $e) {
            logger($e->getCode());
            logger($e->getMessage());

            return $this->getResponse($e->getCode(), $this->extractMessage($e->getMessage()));
        }
    }

    private function extractMessage($message)
    {
        return json_decode(substr($message, strpos($message, '{')))->message;
    }

    /**
     * Get authenticate user info
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function getUserInfo()
    {
        return $this->doAction(function () {
            $response = $this->client->request('GET', 'user');

            return $this->attachData(json_decode($response->getBody()))
                ->getResponse($response->getStatusCode());
        });
    }

    /**
     * Get repository detail
     *
     * @param string $ownerName
     * @param string $repoName
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function getRepoDetail($ownerName, $repoName)
    {
        $url = 'repos/' . $ownerName . '/' . $repoName;

        try {
            $response = $this->client->request('GET', $url);
        } catch (\Exception $e) {
            logger($e);
            throw new CustomException($this->extractMessage($e->getMessage()), $e->getCode());
        }

        return $this->attachData(json_decode($response->getBody()))
            ->getResponse($response->getStatusCode());
    }

    /**
     * Create webhook for target repository
     *
     * @param string $ownerName
     * @param string $repoName
     * @param array $config
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function createHook($ownerName, $repoName, $config = [])
    {
        $url = 'repos/' . $ownerName . '/' . $repoName . '/hooks';
        $defaultConfig = [
            'name' => 'web',
            'active' => true,
            'events' => ['push', 'pull_request'],
            'config' => [
                'url' => env('APP_WEBHOOK_ROUTE'),
                'secret' => env('APP_WEBHOOK_SECRET'),
                'content_type' => 'json',
            ],
        ];
        $config = array_merge($defaultConfig, $config);
        try {
            $response = $this->client->request('POST', $url, [
                \GuzzleHttp\RequestOptions::JSON => $config,
            ]);
        } catch (\Exception $e) {
            logger($e);
            if ($e->getCode() == 422) {
                throw new \Exception(__('messages.repository_exists'), $e->getCode());
            }
            throw new CustomException($this->extractMessage($e->getMessage(), $e->getCode()));
        }

        return $this->attachData(json_decode($response->getBody()))
            ->getResponse($response->getStatusCode());
    }

    public static function changeBuildStatuses($event, $state, $client)
    {
        $mapData = GithubPayloadDataHelper::restructDataForStatuses($event->build);
        $ownerId = Repo::where('full_name', $mapData['repoFullName'])
                   ->first()
                   ->userRepos()
                   ->where('writeable_permission', 1)
                   ->first()
                   ->user_id;
        $rememberToken = User::where('id', $ownerId)->first()->socialite_token;

        $client->authenticate($rememberToken, null, GithubClient::AUTH_HTTP_TOKEN);

        switch ($state) {
            case 'success':
                $message = __('messages.build_success');
                break;
            case 'error':
                $message = __('messages.build_failure');
                break;
            default:
                $message = __('messages.build_pedding');
        }

        $params = [
            'state' => $state,
            'target_url' => env('MIX_APP_URL') . '/repositories/' . $mapData['owner'] . '/'
                . $mapData['repo'] . '/builds/' . $event->build->number,
            'description' => $message,
            'context' => __('messages.ci_brand'),
        ];
        try {
            return $statuses = $client->api('repo')->statuses()->create(
                $mapData['owner'],
                $mapData['repo'],
                $mapData['sha'],
                $params
            );
        } catch (\Exception $e) {
            logger(['Change statuses error.', $e]);
        }
    }
}
