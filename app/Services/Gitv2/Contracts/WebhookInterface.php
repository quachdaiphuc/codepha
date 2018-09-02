<?php

namespace App\Services\Gitv2\Contracts;

interface WebhookInterface
{
    public function createHook($repository);

    public function updateHook($repository, $status);
}
