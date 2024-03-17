<?php
// app/Providers/LoggerServiceProvider.php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Monolog\Logger;
use Monolog\Handler\StreamHandler;
use Monolog\Formatter\LineFormatter;

class LoggerServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        $this->app->singleton('log', function ($app) {
            $logger = new Logger('Announcement');

            // Formatter
            $formatter = new LineFormatter(
                "[%datetime%] %channel%.%level_name%: %message% %context% %extra%\n",
                'Y-m-d H:i:s',
                true,
                true
            );

            // Handler
            $handler = new StreamHandler('php://stderr');
            $handler->setFormatter($formatter);

            // Push handler
            $logger->pushHandler($handler);

            return $logger;
        });
    }
}
