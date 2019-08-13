import $ from 'jquery';

export default class ShowHideSearch {
    constructor(search, searchField, searchSubmit) {
        this.search = search;
        this.searchField = searchField;
        this.searchSubmit = searchSubmit;

        $(window).on('load resize orientationchange', () => {
            $(this.search).css('left', '241px');
            $(this.search).removeClass('active');

            if (window.innerWidth > 768) {
                $(this.searchSubmit).on('mouseover', this.showSearch.bind(this));
                $(document).on('click', this.closeSearch.bind(this));

            } else {
                $(this.searchSubmit).off('mouseover', this.showSearch.bind(this));
                $(document).off('click',  this.closeSearch.bind(this));
                $(this.search).css('left', '0');
            }
        });
    }

    showSearch(e) {        
        if(!$(this.search).hasClass('active')) {
            e.preventDefault;

            $(this.searchField).focus();
            $(this.search).addClass('active').animate({
                left: '0',
            }, 400);
        }
    }

    closeSearch(e) {
        if ($(this.search).hasClass('active')) {

            if (!$(e.target).closest($(this.search)).length) {
                $(this.search).animate({
                    left: '241px'
                }, 400);
                $(this.search).removeClass('active');
            }
        }
    }
}