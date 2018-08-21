<?php

namespace App\Http\Controllers\Api\Auth;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Laravel\Socialite\Facades\Socialite;

class AuthController extends Controller
{

    public function index()
    {
        return view('login');
    }


    /**
     * Redirect the user to the GitHub authentication page.
     *
     * @return \Illuminate\Http\Response
     */
    public function redirectToProvider()
    {
        return Socialite::driver('github')
            ->scopes(['read:user', 'admin:repo_hook', 'repo'])
            ->redirect();
    }

    /**
     * Obtain the user information from GitHub.
     *
     * @return \Illuminate\Http\Response
     */
    public function handleProviderCallback()
    {
        $githubUser = Socialite::driver('github')->user();
        $user = User::withTrashed()->where('username', $githubUser->user['login'])->first();

        if ($user) {
            $user->update($this->mapGithubUserToModel($githubUser));
            Auth::loginUsingId($user->id, true);
            return redirect('/admin');
        }

        return redirect('auth/login');
    }

    private function mapGithubUserToModel($user, $role = null)
    {
        $data = [
            'socialite_id' => $user->id,
            'email' => $user->email,
            'avatar' => $user->avatar,
            'socialite_token' => $user->token,
            'last_repo_update_at' => date('Y-m-d H:i:s'),
            'user_hash' => 'null',
            'role' => 0,
            'user_secret' => 'null',
            'service_type' => 1,
        ];

        return $data;
    }


    public function logout()
    {
        Auth::logout();

        return redirect('auth/login');
    }
}
