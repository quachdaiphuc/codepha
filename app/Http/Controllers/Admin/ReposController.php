<?php
namespace App\Http\Controllers\Admin;


use App\Civ3\Response\JsonResponse;
use App\Http\Controllers\Controller;
use App\Models\Repo;
use App\Services\Gitv2\GitService;
use Carbon\Carbon;
use Github\Client;
use Github\ResultPager;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class ReposController extends Controller
{
    protected $githubClient;
    protected $json;

    /**
     * UserRepoRepository constructor.
     */
    public function __construct(Client $client, JsonResponse $json)
    {
        $this->githubClient = $client;
        $this->json = $json;
    }

    public function index()
    {
        $user = auth()->user();
        $repos = Repo::where('owner', $user->username)->orderBy('id', 'desc')->paginate(10);
        return view('admin.pages.repos.index', compact('repos'));
    }

    public function fetchAll($type = 'owner', $sort = 'full_name', $direction = 'asc', $user = false)
    {
        $userRepos = [];
        $currentUser = auth()->user();
        if ($user) {
            $currentUser = $user;
        }

        try {
            if (!empty($currentUser->socialite_token)) {
                $this->githubClient->authenticate($currentUser->socialite_token, null, Client::AUTH_HTTP_TOKEN);

                $currentUserApi = $this->githubClient->api('current_user');

                $paginator = new ResultPager($this->githubClient);
                $userRepos = $paginator->fetchAll(
                    $currentUserApi,
                    'repositories',
                    [$type, $sort, $direction]
                );
            }
        } catch (\Exception $e) {
            logger($e->getMessage());
        }

        return $userRepos;
    }

    public function fetchUpdate($user = false)
    {
        $currentUser = auth()->user();
        if ($user) {
            $currentUser = $user;
        }

        $listUserRepos = $this->fetchAll('all', 'full_name', 'asc', $currentUser);

        DB::beginTransaction();

        try {
            foreach ($listUserRepos as $userRepo) {
                $repoData = [
                    'owner' => array_get($userRepo, 'owner.login', null),
                    'name' => array_get($userRepo, 'name', null),
                    'full_name' => array_get($userRepo, 'full_name', null),
                    'avatar' => array_get($userRepo, 'owner.avatar_url', null),
                    'link' => array_get($userRepo, 'html_url', null),
                    'private' => array_get($userRepo, 'private', null),
                    'project_type' => array_get($userRepo, 'language', null),
                    'repo_clone' => array_get($userRepo, 'clone_url', null),
                    'repo_branch' => array_get($userRepo, 'default_branch', null),
                    'repo_scm' => 'github',
                    'trusted' => 0,
                    'allow_deploys' => 0,
                    'allow_tags' => 0,
                    'concurrent_builds' => 5,
                    'type' => array_get($userRepo, 'owner.type', 'User'),
                ];

                Repo::updateOrCreate(
                    array_only($repoData, ['owner', 'name']),
                    array_only($repoData, [
                        'full_name',
                        'avatar',
                        'link',
                        'private',
                        'project_type',
                        'repo_clone',
                        'repo_branch',
                        'repo_scm',
                        'type',
                    ])
                );

            }

            DB::commit();
        } catch (\Exception $e) {
            logger($e);
            DB::rollback();

            return back()->with('error', 'Sync error');
        }

        return back()->with('success', 'Sync success');
    }

    public function createHook(Request $request)
    {
        $ownerName = $request->input('owner');
        $repoName = $request->input('repository');
        $user = Auth::user();

        $repository = Repo::where([
            ['full_name', "$ownerName/$repoName"],
            ['repo_scm', $user->getAccountType()],
        ])->firstOrFail();

        if (!$repository->hook_id) {

            $vendorType = $user->getAccountType();
            $webhook = GitService::vendor($vendorType)
                ->webhook()
                ->createHook($repository);
            Repo::where('id', $repository->id)->update([
                'is_active' => 1,
                'allow_push' => 1,
                'allow_pr' => 0,
                'timeout' => 60,
                'hook_id' => $webhook['id'],
            ]);

            GitService::vendor($vendorType)
                ->key()
                ->grantDeployKey($repository);

            return $this->json->success(__('messages.create_success'));
        } elseif ($repository->is_active) {
            return $this->json->badRequest(__('messages.repository_exists'));
        } else {
            return $this->json->badRequest(__('messages.repository_unactive'));
        }
    }

}