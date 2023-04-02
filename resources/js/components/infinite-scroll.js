(function () {
    finishLoading();
    var scrollTrigger = document.getElementById('infinite-scroll-trigger'),
        alreadyLoading = false,
        loadBounce = 0,
        keepLoading = true;

    if (scrollTrigger == null) {
        return;
    }

    function beginLoading() {
        if (alreadyLoading) {
            return;
        }

        alreadyLoading = true;
        var elements = document.querySelectorAll('[data-scroll-loading]');

        elements.forEach(element => {
            element.style.display = 'inherit';
        });
    }

    function finishLoading() {
        var elements = document.querySelectorAll('[data-scroll-loading]');

        elements.forEach(element => {
            element.style.display = 'none';
        });

        // Simple cool down.
        window.setTimeout(function () {
            alreadyLoading = false;
        }, 550);
    }

    var uriObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                onElementVisible(entry.target);
            }
        });
    }, {
        threshold: 0.6
    });

    var targets = document.querySelectorAll('[data-update-uri]');

    targets.forEach(target => {
        uriObserver.observe(target);
    });

    function onElementVisible(element) {
        history.pushState(null, '', element.getAttribute('data-update-uri'));
    }

    function getPageIds() {
        var elements = document.querySelectorAll('[data-page-id]'),
            values = [];

        elements.forEach(element => {
            values.push(element.dataset.pageId);
        });

        return values;
    }

    function hideElementsOnEmpty() {
        var elements = document.querySelectorAll('[data-scroll-hide-on-empty]');
        for (let i = 0; i < elements.length; i++) {
            elements[i].style.display = 'none';
        }
    }

    function loadContent() {
        if (!keepLoading) {
            return;
        }

        loadBounce += 1;
        if (loadBounce <= 1) {
            return;
        }

        beginLoading();

        fetch(window.__scrollState.endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
            },
            body: JSON.stringify({
                ids: getPageIds(),
                template: window.__scrollState.current_template,
                root_id: window.__scrollState.root_id,
                times_loaded: loadBounce - 1
            })
        }).then(response => response.json())
            .then(data => {
                if (!data.has_content) {
                    keepLoading = false;
                    hideElementsOnEmpty();
                    finishLoading();
                    return;
                }

                var contentTarget = document.getElementById('infinite-scroll-target'),
                    newContent = document.createElement('div');
                newContent.innerHTML = data.content;
                document.querySelector('meta[name="csrf-token"]').setAttribute('content', data._token);

                if (newContent.hasChildNodes) {
                    newContent.childNodes.forEach(node => contentTarget.parentNode.insertBefore(node, contentTarget));
                }

                // Hacky workaround to observe all new elements.
                uriObserver.disconnect();
                uriObserver = new IntersectionObserver(entries => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            onElementVisible(entry.target);
                        }
                    });
                }, {
                    threshold: 0.6
                });

                targets = document.querySelectorAll('[data-update-uri]');

                targets.forEach(target => {
                    uriObserver.observe(target);
                });
                finishLoading();
            })
            .catch(function (err) {
                finishLoading();
            });
    }

    var observer = new IntersectionObserver(loadContent, {
        root: null,
        rootMargin: '0px',
        threshold: 0.5
    });
    observer.observe(scrollTrigger);

    var elements = document.querySelectorAll('[data-scroll-load-more]');
    elements.forEach(element => {
        element.addEventListener('click', function () {
            loadContent();
        });
    });
})();