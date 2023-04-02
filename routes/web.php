<?php

use Illuminate\Support\Facades\Route;

Route::post('/fetch-content', function () {
    $result = trim(view('components/infinite_scroll')->with(request()->all())->render());
    $hasContent = strlen($result) > 0;

    return [
        '_token' => csrf_token(),
        'content' => $result,
        'has_content' => $hasContent,
    ];
})->name('fetch-content');
