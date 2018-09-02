<?php

namespace App\Civ3\GithubHelper;

use App\Models\Build;
use Illuminate\Http\Request;

/**
 * Class GithubPayloadDataHelper
 * @package App\Civ3\GithubHelper
 */
class GithubPayloadDataHelper
{
    public function __construct()
    {
        //
    }

    /**
     * @param Request $data
     * @return array
     */
    public static function restructDataForStatuses(Build $build)
    {
        switch ($build->event) {
            case 'pull_request':
                $mapData = [
                    'sha' => $build->commit,
                    'owner' => $build->repo->owner,
                    'repo' => $build->repo->name,
                    'target_url' => $build->build_link,
                    'repoFullName' => $build->repo->full_name,
                ];
                break;

            default:
                $mapData = [
                    'sha' => $build->commit,
                    'owner' => $build->repo->owner,
                    'repo' => $build->repo->name,
                    'target_url' => $build->build_link,
                    'repoFullName' => $build->repo->full_name,
                ];
                break;
        }

        return $mapData;
    }
}
