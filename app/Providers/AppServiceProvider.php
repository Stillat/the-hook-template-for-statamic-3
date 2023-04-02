<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Statamic\Facades\GlobalSet;
use Statamic\View\View;

class AppServiceProvider extends ServiceProvider
{
    public static $lastView = null;

    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        // Set some internal helper variables.
        $global = GlobalSet::findByHandle('site_settings');
        $values = $global->inCurrentSite();

        $paginationType = $values->get('pagination_type', 'links');
        $recentPostCount = $values->get('sidebar_recent_post_count', 6);
        $randomizeTopicFilters = $values->get('randomize_topic_filters', true);

        $topicSortDirection = 'title:asc';

        if ($randomizeTopicFilters) {
            $topicSortDirection = 'random';
        }

        view()->share([
            '_default_page_count' => $values->get('default_page_count', 6),
            '_pagination_type' => $paginationType,
            '_is_infinite_scroll' => $paginationType == 'infinite',
            '_site_name' => $values->get('site_name', ''),
            '_sidebar_recent_post_count' => $recentPostCount,
            '_randomize_topic_filters' => $randomizeTopicFilters,
            '_is_topic_filters_random' => $randomizeTopicFilters,
            '_topic_sort_direction' => $topicSortDirection,
        ]);

        app()->resolving(View::class, function ($hmm) {
            self::$lastView = $hmm;
        });
    }
}
