import $ from 'jquery';

export default class ShowHideSearch {
    constructor(search, searchField, searchSubmit, searchClose, animationSpeed) {
        this.search = search;
        this.searchField = searchField;
        this.searchSubmit = searchSubmit;
        this.searchClose = searchClose;
        this.animationSpeed = animationSpeed;
    }

    showSearch(e) {   
        e.preventDefault();
        $(this.searchField).focus();        

        if(window.innerWidth > 768) {
            if(!$(this.search).hasClass('active')) {

                $(this.search).addClass('active').animate({
                    left: '0',
                }, this.animationSpeed, () => {
                    $(this.searchField).focus();
                });
            }
        }
    }

    closeSearch(e) {
        if ($(this.search).hasClass('active')) {

            if ((!$(e.target).closest($(this.search)).length) || (e.target === this.searchClose[0]) ) {
                $(this.search).animate({
                    left: '241px'
                }, this.animationSpeed);
                $(this.search).removeClass('active');
            }
        }
    }

    eventSetting() {
        $(this.search).css('left', '241px');
        $(this.search).removeClass('active');

        $(this.searchSubmit).on('click', this.showSearch.bind(this));
        $(document).on('click', this.closeSearch.bind(this));
    }

    eventCancel() {
        $(this.search).css('left', '0');
    }
}