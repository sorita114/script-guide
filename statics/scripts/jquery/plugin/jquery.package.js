/*
 *  Web Accessibility
 *  
 *  Copyright (c) 2015 MZ jeros
 *
 *  Dual licensed under the MIT and GPL licenses.
 *  http://en.wikipedia.org/wiki/MIT_License
 *  http://en.wikipedia.org/wiki/GNU_General_Public_License
 */
;
$(function(){
    
    // init tooltip trigger event
    var $tooltip = $('[data-trigger="tooltip"]');
    
    $tooltip.on('mouseenter focusin', function(){
        $($(this).data('target')).show();
    });
    $tooltip.on('mouseleave focusout', function(){
        $($(this).data('target')).hide();
    });
    
    // init layerpopup trigger event
    $('[data-trigger="layerpopup"]').layerpopup();
    
    // init navigation trigger event
    // TODO : 작업
    
    // init rollingContents trigger event
    // TODO : 작업
    
    // init range slider trigger event
    // TODO : 작업
    
    // init datepicker trigger event
    // TODO : 작업
    
    // init tree trigger event
    // TODO : 작업
    
    // init validate trigger event
    // TODO : 작업
    
    // init iframe trigger event
    // TODO : 작업
    
});

(function( $, window, document){
    
/*  
 * jQuery layerpopup
 *
 * @param : {Function} parent
 * @param : {String} checkboxes selector
 * @use :
 * $([[DOM SELECTOR]]).layerpopup({
 *      tpl : '',
 *      selector : '...'
 * });
 * 
 */
$.fn.layerpopup = function(options) {
    
    var defaults = {number : 0},
        config = $.extend(true, defaults, options);
    
    var $wrap = $('<div class="wrap-layerpop"><div class="sect-layerpop"><div class="layerpop-container"></div></div></div>'),
        $header = $('<h2></h2>'),
        $contents = $('<div class="layerpop-contents"></div>'),
        $btnClose = $('<button type="button" class="btn-close" title="닫기"></button>'),
        $container = $wrap.find('.layerpop-container');
    
    $container.append($header).append($contents).after($btnClose);
        
    var $btns = this;
    
    $btns.on('click', function(){
        
        var $b = $(this),
            data = $b.data();
            
        var template = 
        $b.after($wrap);
        // alert('123');
    });
    
    return this.each(function (i, v) {
        
    });
};

/*  
 * jQuery dropdown
 * 
 * 
 */
$.fn.dropdown = function(options) {
    
    var defaults = {number : 0},
        config = $.extend(true, defaults, options);
    
    return this.each(function (i, v) {
        
    });
};

})( jQuery, window, document );