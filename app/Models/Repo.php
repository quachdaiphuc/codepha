<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\Repo
 *
 * @property int $id
 * @property string $owner
 * @property string $name
 * @property string $full_name
 * @property string $avatar
 * @property string $link
 * @property int $private
 * @property string $coverage_score
 * @property string $project_type
 * @property string $repo_clone
 * @property string $repo_branch
 * @property int $timeout
 * @property int $trusted
 * @property int $allow_pr
 * @property int $allow_push
 * @property int $allow_deploys
 * @property int $allow_tags
 * @property string $repo_hash
 * @property string $repo_scm
 * @property int $concurrent_builds
 * @property \Carbon\Carbon|null $created_at
 * @property \Carbon\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\Key[] $keys
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\Registry[] $registries
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\UserRepo[] $userRepos
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Repo whereAllowDeploys($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Repo whereAllowPr($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Repo whereAllowPush($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Repo whereAllowTags($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Repo whereAvatar($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Repo whereConcurrentBuilds($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Repo whereCoverageScore($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Repo whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Repo whereFullName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Repo whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Repo whereLink($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Repo whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Repo whereOwner($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Repo wherePrivate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Repo whereProjectType($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Repo whereRepoBranch($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Repo whereRepoClone($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Repo whereRepoHash($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Repo whereRepoScm($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Repo whereTimeout($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Repo whereTrusted($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Repo whereUpdatedAt($value)
 * @mixin \Eloquent
 * @property int $is_active
 * @property int|null $hook_id
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\Build[] $builds
 * @property-read \App\Models\Key $key
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\RepoSetting[] $setting
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\User[] $users
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Repo whereHookId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Repo whereIsActive($value)
 */
class Repo extends BaseModel
{
    protected $fillable = [
        'owner',
        'name',
        'full_name',
        'avatar',
        'link',
        'private',
        'coverage_score',
        'project_type',
        'repo_clone',
        'repo_branch',
        'timeout',
        'trusted',
        'allow_pr',
        'allow_push',
        'allow_deploys',
        'allow_tags',
        'repo_hash',
        'repo_scm',
        'hook_id',
        'concurrent_builds',
        'is_active',
        'created_at',
        'updated_at',
        'type',
    ];

    protected $dates = ['created_at', 'updated_at'];

    protected $casts = ['private' => 'boolean', 'is_active' => 'boolean'];

    public function getProjectTypeAttribute($value)
    {
        return strtoupper($value);
    }

    public function setProjectTypeAttribute($value)
    {
        return strtoupper($value);
    }

    public function registries()
    {
        return $this->hasMany(Registry::class, 'repo_id', 'id');
    }

    public function userRepos()
    {
        return $this->hasMany(UserRepo::class, 'repo_id', 'id');
    }

    public function users()
    {
        return $this->belongsToMany(User::class, 'user_repos');
    }

    public function setting()
    {
        return $this->hasMany(RepoSetting::class, 'repo_id', 'id');
    }

    public function environments()
    {
        return $this->hasMany(RepoEnvironmentVariable::class, 'repo_id', 'id');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasOne
     */
    public function key()
    {
        return $this->hasOne(Key::class, 'repo_id', 'id');
    }

    public function builds()
    {
        return $this->hasMany(Build::class, 'repo_id', 'id');
    }

    public function recentBuilds(int $limit = 3)
    {
        return $this->builds()->latest()->nPerGroup('repo_id', $limit);
    }

    public function configuration()
    {
        return $this->hasOne(Configuration::class, 'repo_id', 'id');
    }

    public function members()
    {
        return $this->belongsToMany(User::class, 'user_repos')->wherePivot('writeable_permission', 0);
    }

    public function secrets()
    {
        return $this->hasMany(Secret::class, 'repo_id', 'id');
    }
}
