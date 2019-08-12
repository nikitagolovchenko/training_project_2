// import $ from 'jquery';

// export default class ShowHideSearch {
//     constructor(search, searchField, searchSubmit) {
//         this.search = search;
//         this.searchField = searchField;
//         this.searchSubmit = searchSubmit;

//         this.showSearch = this.showSearch.bind(this);
//         this.closeSearch = this.closeSearch.bind(this);

//         $(window).on('load resize orientationchange', function() {

//             if (this.innerWidth > 768) {
//                 $(searchSubmit).on('mouseover', this.showSearch);
//                 $(document).on('click', this.closeSearch);

//             } else {
//                 $(searchSubmit).off('mouseover', this.showSearch);
//                 $(document).off('click',  this.closeSearch);
//                 $(this.search).css('left', '0');
//             }
//         });
//     }

//     showSearch(e) {
//         console.log(this);
        
//         if(!$(this.search).hasClass('active')) {
//             e.preventDefault;

//             $(this.searchField).focus();
//             $(this.search).addClass('active').animate({
//                 left: '0',
//             }, 400);
//         }
//     }

//     closeSearch(e) {
//         if ($(this.search).hasClass('active')) {

//             if (!$(e.target).closest($(this.search)).length) {
//                 $(this.search).animate({
//                     left: '241px'
//                 }, 400);
//                 $(this.search).removeClass('active');
//             }
//         }
//     }
// }