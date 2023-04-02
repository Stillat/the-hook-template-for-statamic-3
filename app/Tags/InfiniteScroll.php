<?php

namespace App\Tags;

use Statamic\Tags\Tags;

class InfiniteScroll extends Tags
{
    public function target()
    {
        return '<div id="infinite-scroll-target"></div>';
    }

    public function trigger()
    {
        return '<div id="infinite-scroll-trigger"></div>';
    }

    public function state()
    {
        $scrollState = [
            'root_id' => $this->context->get('id'),
            'current_template' => $this->context->get('current_template'),
            'endpoint' => route('fetch-content'),
        ];

        return '<script>window.__scrollState = '.json_encode($scrollState).'</script>';
    }
}
