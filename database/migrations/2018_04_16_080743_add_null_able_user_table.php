<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddNullAbleUserTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('users', function (Blueprint $table) {
            $table->string('socialite_id')->nullable()->change();
            $table->string('username')->nullable()->change();
            $table->string('avatar')->nullable()->change();
            $table->smallInteger('is_admin')->default(0)->change();
            $table->string('socialite_token')->nullable()->change();
            $table->string('remember_token')->nullable()->change();
            $table->dateTime('last_repo_update_at')->nullable()->change();
            $table->string('user_hash')->nullable()->change();
            $table->smallInteger('is_active')->nullable()->change();
            $table->string('user_secret')->nullable()->change();
            $table->smallInteger('service_type')->nullable()->change();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('users', function (Blueprint $table) {
            $table->string('socialite_id')->nullable(false)->change();
            $table->string('username')->nullable(false)->change();
            $table->string('avatar')->nullable(false)->change();
            $table->smallInteger('is_admin')->default(0)->change();
            $table->string('socialite_token')->nullable(false)->change();
            $table->string('remember_token')->nullable(false)->change();
            $table->dateTime('last_repo_update_at')->nullable(false)->change();
            $table->string('user_hash')->nullable(false)->change();
            $table->smallInteger('is_active')->nullable(false)->change();
            $table->string('user_secret')->nullable(false)->change();
            $table->smallInteger('service_type')->nullable(false)->change();
        });
    }
}
