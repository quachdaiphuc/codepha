<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddDefaultValueToReposTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('repos', function (Blueprint $table) {
            $table->boolean('private')->default(1)->change();
            $table->string('coverage_score')->nullable()->change();
            $table->string('project_type')->nullable()->change();
            $table->string('repo_clone')->nullable()->change();
            $table->string('repo_branch')->nullable()->change();
            $table->integer('timeout')->nullable()->change();
            $table->boolean('trusted')->nullable()->change();
            $table->boolean('allow_pr')->nullable()->change();
            $table->boolean('allow_push')->nullable()->change();
            $table->boolean('allow_deploys')->nullable()->change();
            $table->boolean('allow_tags')->nullable()->change();
            $table->string('repo_hash')->nullable()->change();
            $table->string('repo_scm')->nullable()->change();
            $table->integer('concurrent_builds')->nullable()->change();
            $table->boolean('is_active')->default(0)->change();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('repos', function (Blueprint $table) {
            $table->boolean('private')->default(0)->change();
            $table->string('coverage_score')->change();
            $table->string('project_type')->change();
            $table->string('repo_clone')->change();
            $table->string('repo_branch')->change();
            $table->integer('timeout')->change();
            $table->boolean('trusted')->change();
            $table->boolean('allow_pr')->change();
            $table->boolean('allow_push')->change();
            $table->boolean('allow_deploys')->change();
            $table->boolean('allow_tags')->change();
            $table->string('repo_hash')->change();
            $table->string('repo_scm')->change();
            $table->integer('concurrent_builds')->change();
            $table->boolean('is_active')->default(1)->change();
        });
    }
}
