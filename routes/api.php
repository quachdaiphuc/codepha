<?php

use Illuminate\Http\Request;

Route::group(['middleware' => ['auth:api']], function() {
  Route::get('/users/me', '\App\Api\Controllers\SessionController@currentUser');
  Route::get('/logout', '\App\Api\Controllers\SessionController@logout');

  Route::apiResource('/users', '\App\Api\Controllers\UserController');
  Route::put('/users/{userId}/update-password', '\App\Api\Controllers\UserController@changePassword');

  Route::get('/avatars', '\App\Api\Controllers\AvatarsController@get');
  Route::post('/avatars', '\App\Api\Controllers\AvatarsController@upload');
  Route::put('/avatars', '\App\Api\Controllers\AvatarsController@update');
  Route::delete('/avatars', '\App\Api\Controllers\AvatarsController@delete');
});

//Route::get('login', 'AuthController@index');
//Route::get('github', 'AuthController@redirectToProvider')->name('login');
//Route::get('github/callback', 'AuthController@handleProviderCallback');

//Route::group([
//    'prefix' => 'admin',
//    'namespace' => 'Api\Auth',
//], function () {
//    Route::get('login', 'AuthController@index');
//    Route::get('github', 'AuthController@redirectToProvider')->name('login');
//    Route::get('github/callback', 'AuthController@handleProviderCallback');
//});