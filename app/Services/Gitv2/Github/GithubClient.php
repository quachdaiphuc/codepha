<?php

namespace App\Services\Gitv2\Github;

use Github\Client;

class GithubClient
{
    protected $client;

    public function __construct()
    {
        $this->client = new Client();
        $this->client->authenticate(auth()->user()->socialite_token, null, Client::AUTH_JWT);
    }
}
