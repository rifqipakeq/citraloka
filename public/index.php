<?php

use Illuminate\Http\Request;

define('LARAVEL_START', microtime(true));

// Determine if the application is in maintenance mode...
if (file_exists($maintenance = __DIR__.'/../storage/framework/maintenance.php')) {
    require $maintenance;
}

//setting untuk atur upload data tanpa limit, upto 2G
ini_set('upload_max_filesize', '2048M');
ini_set('post_max_size', '2048M');
ini_set('memory_limit', '2048M');
ini_set('max_execution_time', '300');

// Register the Composer autoloader...
require __DIR__.'/../vendor/autoload.php';

// Bootstrap Laravel and handle the request...
/** @var Illuminate\Foundation\Application $app */
$app = require_once __DIR__.'/../bootstrap/app.php';

$app->handle(Request::capture())->send();
