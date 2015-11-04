//import('bootstrap-material-design/dist/js/material.js');
//import('bootstrap-material-design/dist/js/ripples.js');

(function($) {
    'use strict';
    $.material.init();

    $('.js-height-window').each(function() {
        $(this).height( $(window).innerHeight() );
    });
})(jQuery);
