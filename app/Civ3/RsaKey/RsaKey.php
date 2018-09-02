<?php

namespace App\Civ3\RsaKey;

use phpseclib\Crypt\RSA;

class RsaKey
{

    /**
     * @return array
     */
    public static function generate($comment)
    {
        $rsa = new RSA();
        $rsa->setComment($comment);
        $rsa->setPublicKeyFormat(RSA::PUBLIC_FORMAT_OPENSSH);
        extract($rsa->createKey());
        return [
            'public' => $publickey,
            'private' => $privatekey,
        ];
    }
}
