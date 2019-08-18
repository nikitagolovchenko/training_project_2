import $ from 'jquery';

export default class addBgWhenScroll {
    constructor(element) {
        this.element = element;
    }

    addRemoveBg() {

        if($(document).scrollTop() > this.element.innerHeight()) {
            $(this.element).addClass('background');

        } else {
            $(this.element).removeClass('background');
        }

    }
}