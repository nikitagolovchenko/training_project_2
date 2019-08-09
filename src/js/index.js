'use strict';

// import $ from 'jquery';


$(document).ready(function () {

    // --- VARIABLES ---
    const $search = $('#search');
    const $searchSubmit = $('#searchSubmit');
    const $searchField = $('#searchField');
    const $nav = $('#nav');
    const $navInner = $('#navInner');
    const $burger = $('#burger');


    // --- FUNCTIONS ---

    // show search
    function showSearch(e) {
        if (!$search.hasClass('active')) {
            e.preventDefault;
            $searchField.focus();
            $search.addClass('active').animate({
                left: '0',
            }, 400);
        }
    };

    // hide search
    function closeSearch(e) {
        if ($search.hasClass('active')) {
            if (!$(e.target).closest($search).length) {
                $search.animate({
                    left: '241px'
                }, 400);
                $search.removeClass('active');
            }
        }
    };

    // _show nav
    function navInnerShow() {
        $nav.show();
        $navInner.animate({
            width: '65%'
        }, 400);
    };

    // _hide nav
    function navInnerHide() {
        $navInner.animate({
            width: '0'
        }, 400, function () {
            $nav.hide();
        });
    };

    // _toggle Nav Burger
    function toggleNavBurger() {
        $(this).toggleClass('active');
        $(this).hasClass('active') ? navInnerShow() : navInnerHide();

        // hide burger/nav when you click anywhere 
        $(document).on('click', function (e) {
            if ($burger.hasClass('active')) {
                if ((!$(e.target).closest($burger).length) && (e.target !== $navInner[0])) {
                    console.log($(this));
                    $burger.removeClass('active');
                    navInnerHide();
                }
            }
        })
    };

    // --- TRIGGER EVENTS ---

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

    $burger.off('click', toggleNavBurger).on('click', toggleNavBurger);



    // ===============================


    const $requestUrl = 'https://my-json-server.typicode.com/ha100790tag/baseBuildJS/images';
    const $worksBtn = $('#worksBtn');

    // masonry
    let $grid = $('.grid').masonry({
        // options
        itemSelector: '.grid__item',
        columnWidth: '.grid__sizer',
        percentPosition: true,
        
    });
    
    // ajax request
    let picturesAmount = 0;

    $.get($requestUrl, function (data, status, xhr) {

        for(let i = 0; i < 10; i++) {
            picturesAmount++;
            
            let gridItem = $(`<div class="grid__item" data-type=${data[i].type}></div>`).append(`<img src=${data[i].url} alt="" />`);
            $('.grid').append(gridItem).masonry('appended', gridItem);
            $grid.imagesLoaded().progress(function () {
                $grid.masonry('layout');
            });
        }
    });



    $worksBtn.on('click', function () {
        $.get($requestUrl, function (data, status, xhr) {

            for(let k = 0; k < 3; k++) {
                if(picturesAmount < data.length) {
                    picturesAmount++;
                    
                    let gridItem = $(`<div class="grid__item" data-type=${data[picturesAmount - 1].type}></div>`).append(`<img src=${data[picturesAmount - 1].url} alt="" />`);
                    $('.grid').append(gridItem).masonry('appended', gridItem);
                    $grid.imagesLoaded().progress(function () {
                        $grid.masonry('layout');
                    });
                    
                } else {
                    return;
                }
            }
        });
    })

});