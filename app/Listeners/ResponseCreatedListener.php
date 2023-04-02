<?php

namespace App\Listeners;

use App\Utilities\Minifier;
use Statamic\Events\ResponseCreated;

class ResponseCreatedListener
{
    /**
     * Handle the event.
     *
     * @param  object  $event
     * @return void
     */
    public function handle(ResponseCreated $event)
    {
        $minifier = new Minifier();

        $content = $event->response->content();

        $event->response->setContent($minifier->minify($content));
    }
}
