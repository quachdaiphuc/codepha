<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Api\BuildController;
use App\Jobs\Build\RunFullBuild;
use App\Jobs\Build\SkipPreviousBuild;
use App\Models\Build;
use App\Models\Repo;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Civ3\GithubHelper\GithubHookHelper;
use App\Civ3\Docker\DockerHelpers;
use App\Jobs\StoringBuildInformation;
use App\Services\Git\Github\GithubActionService;
use App\Civ3\Response\JsonResponse;
use Illuminate\Log\Logger;
use Illuminate\Support\Facades\Log;
use Symfony\Component\Process\PhpExecutableFinder;
use Symfony\Component\Process\Process;

/**
 * Class GithubPayloadController
 * @package App\Http\Controllers\Payload
 */
class GithubPayloadController extends Controller
{
    public function __construct(JsonResponse $json)
    {
        $this->json = $json;
    }

    /**
     * @param Request $request
     * @param DockerHelpers $docker
     * @param GithubHookHelper $git
     * @return string
     * This function call DockerHelper and GithubHelper to start clone project and run build
     */

    public function handlePayload(Request $request)
    {
        $event = $request->header('X-GitHub-Event');

        $repoName = $request->input('repository.name');
        $repoOwner = $request->input('repository.owner.login');

        $repo = Repo::where([
            ['name', '=', $repoName],
            ['owner', '=', $repoOwner],
        ])->firstOrFail();
        switch ($event) {
            case 'push':
                if ($repo->allow_push) {
                    $this->deployProject($request);
                    break;
                } else {
                    break;
                }
            default:
                break;
        }
    }

    public function deployProject(Request $request)
    {
        $clone_url =  $request->input('repository.ssh_url');
        $ownerName = $request->input('head_commit.author.username');
        $repoName = $request->input('repository.name');
        $phpBinaryPath = (new PhpExecutableFinder())->find();
        $basePath = base_path();

        $command = "{$phpBinaryPath} {$basePath}/artisan build:run {$clone_url} {$ownerName} {$repoName}";
        $process = new Process($command . ' > /dev/null 2>/dev/null &');
        $process->run();
    }

}
