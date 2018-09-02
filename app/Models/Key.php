<?php

namespace App\Models;

use Crypt;
use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\Key
 *
 * @property int $id
 * @property int $repo_id
 * @property string $public
 * @property string $private
 * @property \Carbon\Carbon|null $created_at
 * @property \Carbon\Carbon|null $updated_at
 * @property-read \App\Models\Repo $repo
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Key whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Key whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Key wherePrivate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Key wherePublic($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Key whereRepoId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Key whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class Key extends Model
{
    protected $fillable = [
        'repo_id',
        'public',
        'private',
    ];

    protected $hidden = [
        'private',
    ];

    protected $dates = ['created_at', 'updated_at'];

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function repo()
    {
        return $this->belongsTo(Repo::class, 'repo_id', 'id')->withDefault([
            'public' => null,
        ]);
    }

    /**
     * Get repo public key
     *
     * @param $value
     * @return string
     */
    public function getPublicAttribute($value)
    {
        return decrypt($value);
    }

    /**
     * Get repo private key
     *
     * @param $value
     * @return string
     */
    public function getPrivateAttribute($value)
    {
        return decrypt($value);
    }

    /**
     * Set repo public key
     *
     * @param $value
     */
    public function setPublicAttribute($value)
    {
        $this->attributes['public'] = encrypt($value);
    }

    /**
     * Set repo private key
     *
     * @param $value
     */
    public function setPrivateAttribute($value)
    {
        $this->attributes['private'] = encrypt($value);
    }
}
