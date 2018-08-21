<?php
//auth()->login(\App\Models\User::find(2));
$spa = function() {
  return view('app');
};

/**
 * Catchall route for the single page application
 */
Route::get('/{view?}', $spa)->where('view','<>', '(admin)')->name('catchall');

Route::group([
    'prefix' => 'admin',
    'middleware' => 'admin',
], function () {
    Route::get('logout', 'Api\Auth\AuthController@logout');

    Route::get('/', function () {
        return 1;
    });
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