<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateReposTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('repos', function (Blueprint $table) {
            $table->increments('id');
            $table->string('owner');
            $table->string('name');
            $table->string('full_name');
            $table->string('avata');
            $table->string('link');
            $table->tinyInteger('private');
            $table->string('coverage_score');
            $table->string('project_type');
            $table->string('repo_clone');
            $table->string('repo_branch');
            $table->integer('timeout');
            $table->tinyInteger('trusted');
            $table->tinyInteger('allow_pr');
            $table->tinyInteger('allow_push');
            $table->tinyInteger('allow_deploys');
            $table->tinyInteger('allow_tags');
            $table->string('repo_hash');
            $table->string('repo_scm');
            $table->integer('concurrent_builds');
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
        Schema::dropIfExists('repos');
    }
}
