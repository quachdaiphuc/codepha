<?php

namespace App\Models;

use Illuminate\Database\Eloquent\SoftDeletes;
use Laravel\Passport\HasApiTokens,
    Illuminate\Notifications\Notifiable,
    Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    use Notifiable, SoftDeletes;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'username',
        'socialite_id',
        'email',
        'avatar',
        'role',
        'socialite_token',
        'remember_token',
        'last_repo_update_at',
        'user_hash',
        'is_active',
        'user_secret',
        'service_type',
        'created_at',
        'updated_at',
        'last_visit_date',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'socialite_id',
        'remember_token',
        'socialite_token',
    ];

    protected $dates = ['deleted_at', 'last_repo_update_at'];

    protected $casts = ['is_active' => 'boolean'];
}
