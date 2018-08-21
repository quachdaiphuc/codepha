<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->increments('id');
            $table->string('github_id');
            $table->string('username');
            $table->string('email')->unique();
            $table->string('avata');
            $table->tinyInteger('is_admin');
            $table->string('github_token');
            $table->string('remember_token');
            $table->dateTime('last_repo_update_at');
            $table->string('user_hash');
            $table->tinyInteger('is_active');
            $table->string('user_secret');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('users');
    }
}
