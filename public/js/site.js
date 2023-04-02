/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./resources/js/components/infinite-scroll.js":
/*!****************************************************!*\
  !*** ./resources/js/components/infinite-scroll.js ***!
  \****************************************************/
/***/ (() => {

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
    elements.forEach(function (element) {
      element.style.display = 'inherit';
    });
  }
  function finishLoading() {
    var elements = document.querySelectorAll('[data-scroll-loading]');
    elements.forEach(function (element) {
      element.style.display = 'none';
    });

    // Simple cool down.
    window.setTimeout(function () {
      alreadyLoading = false;
    }, 550);
  }
  var uriObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        onElementVisible(entry.target);
      }
    });
  }, {
    threshold: 0.6
  });
  var targets = document.querySelectorAll('[data-update-uri]');
  targets.forEach(function (target) {
    uriObserver.observe(target);
  });
  function onElementVisible(element) {
    history.pushState(null, '', element.getAttribute('data-update-uri'));
  }
  function getPageIds() {
    var elements = document.querySelectorAll('[data-page-id]'),
      values = [];
    elements.forEach(function (element) {
      values.push(element.dataset.pageId);
    });
    return values;
  }
  function hideElementsOnEmpty() {
    var elements = document.querySelectorAll('[data-scroll-hide-on-empty]');
    for (var i = 0; i < elements.length; i++) {
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
    }).then(function (response) {
      return response.json();
    }).then(function (data) {
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
        newContent.childNodes.forEach(function (node) {
          return contentTarget.parentNode.insertBefore(node, contentTarget);
        });
      }

      // Hacky workaround to observe all new elements.
      uriObserver.disconnect();
      uriObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            onElementVisible(entry.target);
          }
        });
      }, {
        threshold: 0.6
      });
      targets = document.querySelectorAll('[data-update-uri]');
      targets.forEach(function (target) {
        uriObserver.observe(target);
      });
      finishLoading();
    })["catch"](function (err) {
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
  elements.forEach(function (element) {
    element.addEventListener('click', function () {
      loadContent();
    });
  });
})();

/***/ }),

/***/ "./resources/js/site.js":
/*!******************************!*\
  !*** ./resources/js/site.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

__webpack_require__(/*! ./components/infinite-scroll.js */ "./resources/js/components/infinite-scroll.js");
var btn = document.querySelector("button"),
  nav = document.querySelector("nav");
btn.addEventListener("click", function () {
  nav.classList.toggle("hidden");
});

/***/ }),

/***/ "./resources/css/tailwind.css":
/*!************************************!*\
  !*** ./resources/css/tailwind.css ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"/js/site": 0,
/******/ 			"css/tailwind": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunk"] = self["webpackChunk"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	__webpack_require__.O(undefined, ["css/tailwind"], () => (__webpack_require__("./resources/js/site.js")))
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["css/tailwind"], () => (__webpack_require__("./resources/css/tailwind.css")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;