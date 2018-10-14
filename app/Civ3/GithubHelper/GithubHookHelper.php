<?php

namespace App\Civ3\GithubHelper;

use App\Civ3\Docker\DockerHelpers;
use App\Models\Build;
use App\Models\Configuration;
use Carbon\Carbon;
use App\Civ3\Rsakey\Rsakey;
use App\Models\Repo;
use App\Jobs\StoreContainerRunning;
use App\Events\BuildLogs\NewLogAdded;
use App\Models\Secret;
use App\Civ3\OfficialPlugin;
use function GuzzleHttp\Psr7\str;
use Illuminate\Support\Facades\Storage;

/**
 * Class GithubHookHelper
 * @package App\Civ3\GithubHelper
 */

class GithubHookHelper
{

    public function cloneProjectByShell($cloneUrl, $ownerName, $repoName)
    {
        $saveFileLogsPath = 'builds/' . $ownerName . '/' . $repoName;
        Storage::append($saveFileLogsPath, config('const.CLONNING'));
        $hostWorkdir = env('HOST_BASH_CLONER');

        # Get ssh key from DB

        $keys = Repo::where('full_name', '=', $ownerName . '/' . $repoName)->first()->key;
        $publicKey = $keys->public;
        $privateKey = $keys->private;

        $tr = "$hostWorkdir \"$publicKey\" \"$privateKey\" {$repoName} ".
              "{$cloneUrl}";

//        Logger($tr);

        $clone = shell_exec($tr . ' && exit');
        Storage::append($saveFileLogsPath, $clone);
    }
}
