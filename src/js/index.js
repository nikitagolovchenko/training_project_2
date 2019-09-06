import $ from 'jquery';
import Masonry from 'masonry-layout';
import jQueryBridget from 'jquery-bridget';
import imagesLoaded from 'imagesloaded';

jQueryBridget('masonry', Masonry, $);
imagesLoaded.makeJQueryPlugin( $ );

// components:
import ScrollTop from 'components/scrollTop';
import ShowHideSearch from 'components/navSearch';
import addBgWhenScroll from './components/addBgWhenScroll';


$(document).ready(function () {    

    // --- variables ---
    let animationSpeed = 300;
    
    const $body = $('body');
    const $search = $('#search');
    const $searchSubmit = $('#search-submit');
    const $searchField = $('#search-field');
    const $closeSearch = $('#close-search');
    const $nav = $('#nav');
    const $navInner = $('#nav-inner');
    const $burger = $('#burger');
    const $headerBottom = $('.header-bottom');
    const $scrollTop = $('#scrollTop');

    const $requestUrl = 'https://my-json-server.typicode.com/ha100790tag/baseBuildJS/images';
    const $worksBtn = $('#works-btn');

    
    // component instances
    const scrollTopButton = new ScrollTop($scrollTop, animationSpeed);
    const search = new ShowHideSearch($search, $searchField, $searchSubmit, $closeSearch, animationSpeed);
    const headerScrollBg = new addBgWhenScroll($headerBottom);


    // --- resize handler ---
    $(window).on('load resize orientationchange', function () {

        $burger.removeClass('active');
        $burger.off('click', toggleNavBurger).on('click', toggleNavBurger);

        if (this.innerWidth > 992) {
            $nav.show();
            $navInner.css('width', '100%');
            
        } else {
            $nav.hide();
            $navInner.css('width', '0');
        }
        
        
        if (this.innerWidth > 768) {
            search.eventSetting();
            
        } else {
            search.eventCancel();
        }

    });
    

    // --- document scroll event ----
    $(document).on('scroll', function() {
        scrollTopButton.showHideElement();

        headerScrollBg.addRemoveBg();
    });


    // ======== functions ========

    // _show nav
    function navInnerShow() {
        $nav.show();
        $navInner.animate({
            width: '65%'
        }, animationSpeed);
    };

    // _hide nav
    function navInnerHide() {
        $navInner.animate({
            width: '0'
        }, animationSpeed, () => {
            $nav.hide();
        });
    };

    // _toggle Nav Burger
    function toggleNavBurger() {
        $(this).toggleClass('active');
        $($body).toggleClass('no-scroll');
        $(this).hasClass('active') ? navInnerShow() : navInnerHide();

        $(document).on('click', function (e) {
            if ($burger.hasClass('active')) {

                if ((!$(e.target).closest($burger).length) && (e.target !== $navInner[0])) {
                    $burger.removeClass('active');
                    $($body).removeClass('no-scroll');
                    navInnerHide();
                }
            }
        })
    };



    // =====================================================


    // masonry
    let $grid = $('.grid').masonry({

        itemSelector: '.grid__item',
        columnWidth: '.grid__sizer',
        percentPosition: true,
        
    });
    
    // amount of open images
    let picturesAmount = 0;
    // array of pictures
    let elemArr = [];
    // how many pictures to upload
    let picturesUpload = 9;


    function masonryLaunch(picture) {
        $('.grid').append(picture).masonry('appended', picture);

        $grid.imagesLoaded().progress(function () {
            $grid.masonry('layout');
        });
    }

    // --- ajax request when a page is loaded ---
    let xhrLoad = $.get($requestUrl, function (data) {

        for(let i = 0; i < picturesUpload; i++) {
            picturesAmount++;

            const link = $(`<a class="works__link icon-search" href="picture.html" target="_blank"></a>`);
            $(link).append(`<img src=${data[i].url} alt="" />`);

            const gridItem = $(`<div class="grid__item works__item" data-type=${data[i].type}></div>`).append(link);

            elemArr.push(gridItem);
            masonryLaunch(gridItem);            
        }
    });

    // opening pictures in a new tab
    xhrLoad.then(() => {
        $('.works__link')
        .off('click', openImg)
        .on('click', openImg);
    })
    .catch(() => {
        alert('Error! Check the correctness of the specified data')
        console.log('Error! Check the correctness of the specified data');
    });


    // --- ajax request when a button is clicked ---
    $worksBtn.on('click', function () {

        let httpRec = $.get($requestUrl, function (data) {

            for(let i = 0; i < 3; i++) {
                if(picturesAmount < data.length) {
                    picturesAmount++;
                    
                    const link = $(`<a class="works__link icon-search" href="picture.html" target="_blank"></a>`);
                    $(link).append(`<img src=${data[picturesAmount - 1].url} alt="" />`);

                    const gridItem = $(`<div class="grid__item works__item" data-type=${data[picturesAmount - 1].type}></div>`).append(link);

                    elemArr.push(gridItem);
                    masonryLaunch(gridItem);

                } else {
                    $($worksBtn).hide(animationSpeed);
                }
            }
        });

        // opening pictures in a new tab
        httpRec.then(() => {
            $('.works__link')
            .off('click', openImg)
            .on('click', openImg);
        })
        .catch(() => {
            alert('Error! Check the correctness of the specified data')
            console.log('Error! Check the correctness of the specified data');
        });
    });


    // =========================================

    // --- ФИЛЬТР КАРТИНОК ---
    let removed = [];

    $('[data-sort]').on('click', function() {
        
        $('[data-sort]').removeClass('active');
        $(this).addClass('active');
        
        let sort = $(this).data('sort');

        if(sort === 'all') {
            // show hidden pictures and clear the array
            $(removed).each((i, val) => {
                $(val).show();
                $grid.masonry( 'layout');
            });
            removed.splice(0);

        } else {
            // show hidden pictures and clear the array
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


    // --- opening pictures in a new tab ---
    function openImg(event) {
        let attr = $(event.target).find('img').attr('src');
        console.log($(event.target).find('img').attr('src'));

        sessionStorage.setItem('link', attr);    

        // window.open('picture.html', '_blank');
    };

    
    // --- picture.html ---
    let link = sessionStorage.getItem('link');

    $('#picture').attr('src', link);
    $('#pictureWrap').css('backgroundImage', `url(${link})`);

});



