import $ from 'jquery';

export default class ScrollTop {
    constructor(element) {
        this.element = element;

        $(document).on('scroll', this.showHideElement.bind(this));
        $(this.element).on('click', this.scrollTopAnimate);
    }

    showHideElement() {
        // высота окна браузера
        let windowHeight = $(window).height();
        // значение скролла
        let scrollTop = $(document).scrollTop();

        if (scrollTop >= windowHeight) {
            $(this.element).show(500);

        } else {
            $(this.element).hide(500);
        }
    }

    scrollTopAnimate() {
        $('html').animate({
            scrollTop: '0'
        }, 500);
    }
}
