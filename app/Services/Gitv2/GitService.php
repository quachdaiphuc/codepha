<?php

namespace App\Services\Gitv2;

use App\Services\Gitv2\Github\GithubService;

class GitService
{
    public static function vendor($vendor)
    {
        switch ($vendor) {
            case 'github':
                return new GithubService();
                break;
            default:
                return new GithubService();
                break;
        }
    }
}
