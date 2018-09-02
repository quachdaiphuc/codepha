<?php

namespace App\Console\Commands;

use App\Models\Build;
use App\Models\Node;
use Illuminate\Console\Command;

class RunFullBuild extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'build:run {cloneUrl} {ownerName} {repoName}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Run build on node';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        $cloneUrl = $this->argument('cloneUrl');
        $ownerName = $this->argument('ownerName');
        $repoName = $this->argument('repoName');
        run_full_build($cloneUrl, $ownerName, $repoName);
    }
}
