<?php

namespace App\Services\Gitv2\Github;

use App\Services\Gitv2\Github\Api\Collaborator;
use App\Services\Gitv2\Github\Api\Webhook;
use App\Services\Gitv2\Github\Api\Key;

class GithubService
{
    public function collaborator()
    {
        return new Collaborator;
    }

    public function webhook()
    {
        return new Webhook;
    }

    public function key()
    {
        return new Key;
    }
}
