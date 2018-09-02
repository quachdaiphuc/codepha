<?php

namespace App\Http\Middleware;

use App\Exceptions\CustomException;
use Closure;

class VerifyGithubWebhook
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
//        $generated = 'sha1=' . hash_hmac('sha1', $request->getContent(), env('APP_WEBHOOK_SECRET'));
//
//        $signature = $request->header('X-Hub-Signature');
//
//        if (!hash_equals($generated, $signature)) {
//            throw new CustomException('Signatures didn\'t match!', 500);
//        };

        return $next($request);
    }
}
