import $ from 'jquery';

export default class ShowHideSearch {
    constructor(search, searchForm, searchField, searchSubmit, searchClose, animationSpeed) {
        this.search = search;
        this.searchForm = searchForm;
        this.searchField = searchField;
        this.searchSubmit = searchSubmit;
        this.searchClose = searchClose;
        this.animationSpeed = animationSpeed;
    }
    
    get hideWidth() {
        return $(this.searchForm).width();
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
                    left: this.hideWidth
                }, this.animationSpeed);
                $(this.search).removeClass('active');
            }
        }
    }

    eventSetting() {
        $(this.search).css('left', this.hideWidth);
        $(this.search).removeClass('active');

        $(this.searchSubmit).on('click', this.showSearch.bind(this));
        $(document).on('click', this.closeSearch.bind(this));
    }

    eventCancel() {
        $(this.search).css('left', '0');
    }
}