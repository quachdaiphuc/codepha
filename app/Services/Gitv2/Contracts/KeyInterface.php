<?php

namespace App\Services\Gitv2\Contracts;

interface KeyInterface
{
    public function grantDeployKey($repository);
}
