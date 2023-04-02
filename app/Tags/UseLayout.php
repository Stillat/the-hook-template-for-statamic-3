<?php

namespace App\Tags;

use App\Providers\AppServiceProvider;
use Statamic\Tags\Tags;

class UseLayout extends Tags
{
    public function wildcard($tag)
    {
        if (AppServiceProvider::$lastView != null) {
            AppServiceProvider::$lastView->layout($tag);
        }
    }
}
