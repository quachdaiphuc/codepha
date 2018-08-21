<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class EditGithubTokenFiedsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('users', function (Blueprint $table) {
            $table->renameColumn('github_id', 'socialite_id');
            $table->renameColumn('github_token', 'socialite_token');
            $table->tinyInteger('service_type');
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
            $table->renameColumn('socialite_id', 'github_id');
            $table->renameColumn('socialite_token', 'github_token');
            $table->dropColumn('service_type');
        });
    }
}
