$(function () {
 	
	// 보정할 offsetTop
	var offset = 90;
	
	// init bootstrap scrollspy
	$(document.body).scrollspy({
	    target: '#sidebar',
	    offset: 150
    });
    
    // hash 있는 경우, 초기 offset 보정
    if(location.hash) {
    	setTimeout(function(){
	    	var $target = $(location.hash);
	    	var targetTop = $target.offset().top;
	    	console.log('targetTop : ' + targetTop);
	    	correctOffset(targetTop);
    	}, 0);
    }
    
    function correctOffset(n){
        n = n || 0;
        
        setTimeout(function(){
            $(document.body).scrollTop(n - offset);
        }, 0);
    }
    
    (function initSideNavi(){
        
        var $navItem = $('#sidebar').find('a');
        $navItem.on('click', function(){
            
            var $target = $(this.getAttribute('href'));
            var bodyHeight = $(document.body).height();
            var windowHeight = $(window).height();
            var targetTop = $target.offset().top;
            var offsetBottom = bodyHeight - targetTop;
            
            
            if(offsetBottom > windowHeight){
                correctOffset(targetTop);    
            } else {
            	correctOffset(targetTop);	//bodyHeight
            }
            return false;
        });
    })();
    
//    $('.collapse').on('show.bs.collapse', function () {
//		var $col = $(this),
//			id = $col.attr('id');
//				
//		$('button[data-target="#' + id + '"]').removeClass('glyphicon-plus').addClass('glyphicon-minus');
//	  
//	}).on('hidden.bs.collapse', function () {
//		var $col = $(this),
//			id = $col.attr('id');
//				
//		$('button[data-target="#' + id + '"]').removeClass('glyphicon-minus').addClass('glyphicon-plus');
//	});
});
