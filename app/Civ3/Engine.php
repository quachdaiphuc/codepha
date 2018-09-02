<?php

use App\Civ3\GithubHelper\GithubHookHelper;
use App\Civ3\Docker\DockerHelpers;
use App\Events\BuildStatuses\BuildPending;
use App\Events\BuildStatuses\BuildError;
use App\Events\BuildStatuses\BuildSucess;
use App\Events\BuildStatuses\BuildMessage;
use App\Events\BuildStatuses\BuildFailure;
use App\Models\Build;
use App\Models\Node;
use App\Events\BuildLogs\FinishBuild;
use App\Jobs\StoreNetworkRunning;
use Illuminate\Support\Facades\Storage;

if (!function_exists('run_full_build')) {
    /**
     * @param Build $build
     */
    function run_full_build($cloneUrl, $ownerName, $repoName)
    {
        $git = new GithubHookHelper();

        # Clone project
        $project = $git->cloneProjectByShell($cloneUrl, $ownerName, $repoName);

    }
}

