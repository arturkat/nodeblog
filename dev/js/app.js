var $ = window.jQuery;

$(document).ready(function() {
    window.console.log('JS is ready!');

    (function headerScroll() {
        scrollClass();
        $(document).on('scroll', scrollClass);

        function scrollClass() {
            var scrollTopDistance = $(document).scrollTop(),
                $headerNav = $('.header-nav');
            if (scrollTopDistance > 0) {
                $headerNav.addClass('scrolled');
            } else {
                $headerNav.removeClass('scrolled');
            }
        }
    })();
});
