import $ from 'jquery';

export default class ScrollTop {
    constructor(myElement) {
        this myElement = myElement;

    }

    static showElement() { 
        $(document).on('scroll', function() {

            let $windowHeight = $(window).height();
            let $scrollTop = $(document).scrollTop();

            if($scrollTop >= $windowHeight) {
                $(myElement).show(500);
                
            } else {
                $(myElement).hide(500);
            }
        });
    }

    static scrollTop() {
        $(myElement).on('click', function() {

            $('html').animate({   
                scrollTop: '0'
            }, 500); 
        });
    }
};



