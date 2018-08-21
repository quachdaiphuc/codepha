<!doctype html>
<html lang="{{ app()->getLocale() }}">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf-token" content="{{ csrf_token() }}">

        <title>Framgia CI | Login</title>

        {{--<link rel="stylesheet" type="text/css" href={{ mix('css/app.css') }}>--}}
    </head>
    <body class="normalize">
        <div class="flex-container">
            <a href={{ route('login') }} class="material-btn">
                {{ __('Login with Github') }}
            </a>
        </div>
        @if (session('auth_msg'))
            <div class="message-box">
                <p>{{ session('auth_msg') }}</p>
            </div>
        @endif
    </body>
