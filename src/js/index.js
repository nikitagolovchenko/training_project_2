'use strict';

import $ from 'jquery';
import Masonry from 'masonry-layout';
import jQueryBridget from 'jquery-bridget';
import imagesLoaded from 'imagesloaded';

jQueryBridget('masonry', Masonry, $);
imagesLoaded.makeJQueryPlugin( $ );

// импорт компонента:
import ScrollTop from 'components/scrollTop';


$(document).ready(function () {
    // вызов компонента:
    const scrollElement = new ScrollTop('#scrollTop');


    // --- variables ---
    const $search = $('#search');
    const $searchSubmit = $('#searchSubmit');
    const $searchField = $('#searchField');
    const $nav = $('#nav');
    const $navInner = $('#navInner');
    const $burger = $('#burger');
 

    // show search function
    function showSearch(e) {
        if (!$search.hasClass('active')) {
            e.preventDefault;
            $searchField.focus();
            $search.addClass('active').animate({
                left: '0',
            }, 400);
        }
    };

    // hide search function
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

    // --- trigger events ---

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



    // =====================================================


    const $requestUrl = 'https://my-json-server.typicode.com/ha100790tag/baseBuildJS/images';
    const $worksBtn = $('#worksBtn');

    // masonry
    let $grid = $('.grid').masonry({

        itemSelector: '.grid__item',
        columnWidth: '.grid__sizer',
        percentPosition: true,
        
    });
    
    // кол-во открыых картинок
    let picturesAmount = 0;
    // массив картинок
    let elemArr = [];
    
    // --- ajax request при загрузке страницы ---
    let xhrLoad = $.get($requestUrl, function (data) {

        for(let i = 0; i < 10; i++) {
            picturesAmount++;

            let link = $(`<a class="works__link icon-search" href="javascript:void(0)"></a>`);
            $(link).append(`<img src=${data[i].url} alt="" />`);

            let gridItem = $(`<div class="grid__item works__item" data-type=${data[i].type}></div>`).append(link);

            elemArr.push(gridItem);
            
            $('.grid').append(gridItem).masonry('appended', gridItem);

            $grid.imagesLoaded().progress(function () {
                $grid.masonry('layout');
            });
        }
    });

    // открытваем картинку в новой вкладке
    xhrLoad.then(function() {
        $('.works__link').off('click', openImg).on('click', openImg);
    });


    // --- ajax request при клике на кнопку---
    $worksBtn.on('click', function () {
        let httpRec = $.get($requestUrl, function (data) {

            for(let k = 0; k < 3; k++) {
                if(picturesAmount < data.length) {
                    picturesAmount++;
                    
                    let link = $(`<a class="works__link icon-search" href="javascript:void(0)"></a>`);
                    $(link).append(`<img src=${data[picturesAmount - 1].url} alt="" />`);

                    let gridItem = $(`<div class="grid__item works__item" data-type=${data[picturesAmount - 1].type}></div>`).append(link);

                    elemArr.push(gridItem);

                    $('.grid').append(gridItem).masonry('appended', gridItem);

                    $grid.imagesLoaded().progress(function () {
                        $grid.masonry('layout');
                    });
                    
                } else {
                    return;
                }
            }
        });

        // открытваем картинку в новой вкладке
        httpRec.then(function() {
            $('.works__link').off('click', openImg).on('click', openImg);
        })
    });

    // =========================================

    // --- ФИЛЬТР КАРТИНОК ---
    let removed = [];

    $('[data-sort]').on('click', function() {
        // значение атрибута data:
        let sort = $(this).data('sort');

        if(sort === 'all') {
            // показываем все скрытые картинки и очищаем массив
            $(removed).each((i, val) => {
                $(val).show();
                $grid.masonry( 'layout');
            });
            removed.splice(0);

        } else {
            // показываем все скрытые картинки и очищаем массив
            $(removed).each((i, val) => {
                $(val).show();
            });
            removed.splice(0);


            $(elemArr).each((i, val) => {
                if(val.data('type') !== sort) {

                    let hidden = $(val).hide();

                    removed.push(hidden);
                    
                    $grid.masonry( 'layout');
                } 
            });
        }
    });


    // --- открытие картинок в новой вкладке ---
    function openImg(event) {
        event.preventDefault;
        let attr = $(event.target).children().attr('src');
        console.log($(event.target).children().attr('src'));

        sessionStorage.setItem('link', attr);    

        window.open('picture.html', '_blank');
    };

    
    // --- страница с картинкой ---
    let link = sessionStorage.getItem('link');

    $('#picture').attr('src', link);
    $('#pictureWrap').css('backgroundImage', `url(${link})`);











    // // show scroll-up button
    // let $windowHeight = $(window).height();
    // let $scrollTop;

    // $(document).on('scroll', function() {
    //     $scrollTop = $(document).scrollTop();

    //     if($scrollTop >= $windowHeight) {
    //         $('#scrollTop').show(500);
              
    //     } else {
    //         $('#scrollTop').hide(500);
    //     }
    // });

    // // scrollTop
    // $('#scrollTop').on('click', function() {
    //     console.log($scrollTop );
    //     $scrollTop = 0;
    //     console.log($scrollTop );

    //     $('html').animate({   
	// 		scrollTop: '0'
	// 	}, 500); 
    // });

});