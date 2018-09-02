<?php

namespace App\Services\Gitv2\Contracts;

interface CollaboratorInterface
{
    public function syncCollaborators($repository);
}
