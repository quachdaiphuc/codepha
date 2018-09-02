<?php

return [
    'notification' => [
        'room' => 'ROOM',
        'mail' => 'MAIL',
        'api' => 'API',
        'channel' => 'CHANNEL',
    ],
    'service_type' => [
        'github' => 1,
    ],
    'repo_type' => [
        'all',
        'private',
        'public',
    ],
    'filter_all_service' => 0,
    'USER_PER_PAGE' => 15,
    'REPO_PER_PAGE' => 15,
    'BUILD_PER_PAGE' => 30,
    'NODE_PER_PAGE' => 15,
    'SECRET_CONFIG_PER_PAGE' => 5,
    'webhook' => [
        'github' => [
            'name' => 'web',
            'active' => true,
            'events' => [
                'push',
                'pull_request',
                'member',
                'team_add',
            ],
            'config' => [
                'url' => env('APP_WEBHOOK_ROUTE'),
                'secret' => env('APP_WEBHOOK_SECRET'),
                'content_type' => 'json',
            ],
        ],
    ],
    'STATUS' => [
        'SKIPPED' => 'skipped',
        'PENDING' => 'pending',
        'RUNNING' => 'running',
        'SUCCESS' => 'success',
        'FAILURE' => 'failure',
        'KILLED' => 'killed',
        'TIMEOUT' => 'timeout',
        'ERROR' => 'error',
    ],
    'BUILD' => [
        'DEFAULT_TIMEOUT' => 20,
    ],
    'STARTBUILD' => 'Start build check, Goodluck !',
    'CLONNING' => 'Cloning your project...',
    'YMLNOTEXIST' => "Build failed ! Your yml configuration not found ! \r " .
                     "This may happen, case you don't have framgia-ci.yml file in your project" .
                     ' or something wrong when we try clone your project. Make sure you have ' .
                     ' framgia-ci.yml file and try again !',
    'YMLINVALID' => "Build failed ! You yml configuration is invalid : \r",
    'role' => [
        'ADMIN' => 2,
        'MOD' => 1,
        'USER' => 0,
    ],
    'allow_fetch_repo_role' => [
        'ADMIN' => 1,
        'MOD' => 2,
    ],
];
