/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/index.js":
/*!*************************!*\
  !*** ./src/js/index.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
 // import $ from 'jquery';

$(document).ready(function () {
  // --- VARIABLES ---
  var $search = $('#search');
  var $searchSubmit = $('#searchSubmit');
  var $searchField = $('#searchField');
  var $nav = $('#nav');
  var $navInner = $('#navInner');
  var $burger = $('#burger'); // --- FUNCTIONS ---
  // show search

  function showSearch(e) {
    if (!$search.hasClass('active')) {
      e.preventDefault;
      $searchField.focus();
      $search.addClass('active').animate({
        left: '0'
      }, 400);
    }
  }

  ; // hide search

  function closeSearch(e) {
    if ($search.hasClass('active')) {
      if (!$(e.target).closest($search).length) {
        $search.animate({
          left: '241px'
        }, 400);
        $search.removeClass('active');
      }
    }
  }

  ; // _show nav

  function navInnerShow() {
    $nav.show();
    $navInner.animate({
      width: '65%'
    }, 400);
  }

  ; // _hide nav

  function navInnerHide() {
    $navInner.animate({
      width: '0'
    }, 400, function () {
      $nav.hide();
    });
  }

  ; // _toggle Nav Burger

  function toggleNavBurger() {
    $(this).toggleClass('active');
    $(this).hasClass('active') ? navInnerShow() : navInnerHide(); // hide burger/nav when you click anywhere 

    $(document).on('click', function (e) {
      if ($burger.hasClass('active')) {
        if (!$(e.target).closest($burger).length && e.target !== $navInner[0]) {
          console.log($(this));
          $burger.removeClass('active');
          navInnerHide();
        }
      }
    });
  }

  ; // --- TRIGGER EVENTS ---

  $(window).on('load resize orientationchange', function () {
    // resizing errors correction
    $burger.removeClass('active');

    if (this.innerWidth > 992) {
      $nav.show();
      $navInner.css('width', '100%');
    } else {
      $nav.hide();
      $navInner.css('width', '0');
    }

    if (this.innerWidth > 768) {
      $searchSubmit.on('mouseover', showSearch);
      $(document).on('click', closeSearch);
    } else {
      $searchSubmit.off('mouseover', showSearch);
      $(document).off('click', closeSearch);
      $search.css('left', '0');
    }
  });
  $burger.off('click', toggleNavBurger).on('click', toggleNavBurger); // ===============================

  var $requestUrl = 'https://my-json-server.typicode.com/ha100790tag/baseBuildJS/images';
  var $worksBtn = $('#worksBtn'); // masonry

  var $grid = $('.grid').masonry({
    // options
    itemSelector: '.grid__item',
    columnWidth: '.grid__sizer',
    percentPosition: true
  }); // ajax request

  var picturesAmount = 0;
  $.get($requestUrl, function (data, status, xhr) {
    for (var i = 0; i < 10; i++) {
      picturesAmount++;
      var gridItem = $("<div class=\"grid__item\" data-type=".concat(data[i].type, "></div>")).append("<img src=".concat(data[i].url, " alt=\"\" />"));
      $('.grid').append(gridItem).masonry('appended', gridItem);
      $grid.imagesLoaded().progress(function () {
        $grid.masonry('layout');
      });
    }
  });
  $worksBtn.on('click', function () {
    $.get($requestUrl, function (data, status, xhr) {
      for (var k = 0; k < 3; k++) {
        if (picturesAmount < data.length) {
          picturesAmount++;
          var gridItem = $("<div class=\"grid__item\" data-type=".concat(data[picturesAmount - 1].type, "></div>")).append("<img src=".concat(data[picturesAmount - 1].url, " alt=\"\" />"));
          $('.grid').append(gridItem).masonry('appended', gridItem);
          $grid.imagesLoaded().progress(function () {
            $grid.masonry('layout');
          });
        } else {
          return;
        }
      }
    });
  });
});

/***/ })

/******/ });
//# sourceMappingURL=index.js.map