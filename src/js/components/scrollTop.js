import $ from 'jquery';

export default class ScrollTop {
    constructor(element, animationSpeed) {
        this.element = element;
        this.animationSpeed = animationSpeed;

        $(document).on('scroll', this.showHideElement.bind(this));
        $(this.element).on('click', this.scrollTopAnimate);
    }

    showHideElement() {
        // browser window height
        let windowHeight = $(window).height();
        // scroll value
        let scrollTop = $(document).scrollTop();

        if (scrollTop >= windowHeight) {
            $(this.element).show(this.animationSpeed);

        } else {
            $(this.element).hide(this.animationSpeed);
        }
    }

    scrollTopAnimate() {
        $('html').animate({
            scrollTop: '0'
        }, this.animationSpeed);
    }
}
