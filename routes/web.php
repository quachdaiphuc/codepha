<?php
//auth()->login(\App\Models\User::find(2));
$spa = function() {
  return view('app');
};

/**
 * Catchall route for the single page application
 */
Route::get('/{view?}', $spa)->where('view','<>', '(admin)')->name('catchall');

#Logout
Route::get('logout', 'Api\Auth\AuthController@logout');

Route::group([
    'prefix' => 'admin',
    'middleware' => 'admin',
    'namespace' => 'Admin',
], function () {

    #Home
    Route::get('/', 'ReposController@index')->name('repos.index');

    # Default repos page
    Route::get('repos', 'ReposController@index')->name('repos.index');
    Route::post('repos/sync-repos', 'ReposController@fetchUpdate')->name('sync.repos');
    Route::post('repos/create-hook', 'ReposController@createHook');
});

Route::group(['prefix' => 'github', 'namespace' => 'Admin', 'middleware' => 'github-webhook'], function () {
    Route::post('/hook', 'GithubPayloadController@handlePayload');
});

Route::group([
    'prefix' => 'auth',
    'namespace' => 'Api\Auth',
    'middleware' => 're-login',
], function () {
    Route::get('login', 'AuthController@index');
    Route::get('github', 'AuthController@redirectToProvider')->name('login');
    Route::get('github/callback', 'AuthController@handleProviderCallback');
});