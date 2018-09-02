<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use App\Civ3\GithubHelper\GithubApi;
use Illuminate\Support\Facades\Auth;
use App\Services\GitService;

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    protected $api;
    protected $service;

    protected function initGithubService()
    {
        $this->api = new GithubApi([
            'Authorization' => Auth::user()->socialite_token,
        ]);
        $this->service = new GitService($this->api);
    }
}
