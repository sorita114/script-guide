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
    // init layerpopup trigger event
    $('[data-trigger="layerpopup"]').layerpopup();
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

    var defaults = {
    		number : 0,
    		callback : function () {

    		}
    	},
        config = $.extend(true, defaults, options);

    var $wrap = $('<div class="wrap-layerpop"><div class="sect-layerpop"><div class="layerpop-container"></div></div></div>'),
        $header = $('<h2></h2>'),
        $contents = $('<div class="layerpop-contents"></div>'),
        $btnClose = $('<button type="button" class="btn-close" title="닫기"></button>'),
        $container = $wrap.find('.layerpop-container');

//    $container.append($header).append($contents).after($btnClose);
//    $container.after($btnClose);

    var $btns = this;

    $btns.on('click', function(){

        var $b = $(this),
            data = $b.data(),
            tSelector = data.target || $b.attr('href'),
            $layer,
            id = getUniqueId(data),
            sTpl = '';

        // no template target,
        if(!tSelector || $b.data('clicked')){
        	return;
        }

        // get layer jquery Dom.
        sTpl = $(tSelector).html().replace(/\n/g, "");
        // console.log(sTpl);
        if($.parseHTML) {
        	$layer = $($.parseHTML(sTpl));	// jquery 1.9.0 parse error fixed.
        } else {
        	$layer = $(sTpl);
        }
        // console.log($layer);

        // set layer eventHandler.
        $layer.attr('id', clearPrefix(id)).on('click', '.btn-close', function() {
        	$b.removeData('clicked');
    		$layer.remove();
        });

        // set btn data-clicked.
        $b.after($layer).data('clicked', true);

        // excute callback.
        config.callback && config.callback($layer);

        // show layer.
        $layer.show();

        function getUniqueId(d) {
	    	var id = d.tempid;
	    	if(!id){
	        	id = tSelector + '_' + new Date().getTime();
	        	$b.data('tempid', id);
	        }
	        return id;
	    }
    });

    // remove selector has special charactor.
    function clearPrefix(v){
    	return v.replace(/^[.\#]/,'');
    }

    return this.each(function (i, v) {

    });
};

/*
 * jQuery dropdown
 *
 */
$.fn.dropdown = function( options ) {
    return this.each( function() {
    	var $this = $( this ),
    		datas = $this.data(),
    		plugins = datas.plugins;

      $this.on( 'click' , layerToggle );

      if( plugins !== undefined && plugins.indexOf( 'hotKey') !== -1 ) {
    	  $this.dropdown.hotKey( $this );
      }

      $this.closest( 'div' ).on( 'mouseleave' , function( event ) {
    	  $(this).removeClass( 'on' ).find( '>ul' ).hide();
      });

      $this.next().find( '> li:last').find( 'a' ).on( 'focusout', function( event ) {
    	 $this.closest( 'div' ).removeClass( 'on' ).find( '>ul' ).hide();
      });

      $this
      	.next()
      	.find('> li a')
    	.on( 'click', action )

      function action( event ) {
      	event.preventDefault();

      	var $target = $( event.target ),
      		href = $target.attr( 'href' ),
      		type = $target.attr( 'target' ),
      		value = $target.data( 'value' ),
      		name = $target.text();

      	if ( value !== undefined ){

      		options && options.onChange && options.onChange( value );

      	} else {
      		if( options && options.onChange ) {

      			options.onChange();

      		} else {
      			window.open( href , name );
      		}

      	}

      	closeLayer( event );
      }

      function layerToggle( event ) {
    	  var $target = $( event.target );
    	  var $wrapper = $target.closest( 'div' );
    	  var $content = $target.next();

    	  if( $wrapper.hasClass( 'on' ) ) {
    		  closeLayer( event );
    	  } else {
    		  openLayer( $content );
    	  }
      }
    });

      //bind event
    function openLayer ( $el ) {
      	$el.closest('div').addClass( 'on' ),
  		$el.show();
	}

    function closeLayer ( event ) {
	  	var $this = $( event.target ),
	  		$wrapper = $this.closest( 'div' ),
	  		$content = $this.next();

	  	$wrapper.removeClass( 'on' );
	  	$content.hide();
    }
};

$.fn.dropdown.hotKey = function( el ) {
	el.next().find( '> li' ).find( 'a' ).on( 'keydown' , function ( event ) {
		var keyCode = event.keyCode,
			$target = $( event.target ),
			$current = $target.closest( 'li' );

		if( keyCode === 38 ) {
			$current.prev().find( 'a' ).focus();
		}

		if( keyCode === 40 ) {

			$current.next().find( 'a' ).focus();

		}
	});
};

/*
 * @name : jquery.visualMotion
 * @depends : jquery.
 * @desc : visual motion.
 * @desc : indicator 사이 간격 margin - BTN_MARGIN = 5
 * @desc : indicator button width 사이즈 - BTN_WIDTH = 13
 // TODO : 성능이슈 발생시, 이미지 처리방식 변경.
 // TODO : motion index 에 대한 queue 처리. > motion_queue.
 // TODO : 모션 방향 처리 : 좌 > 우, 우 > 좌
 // TODO : type 을 추가한다. banner, photo
 // TODO : 비동기 데이타 처리 관련 추가?
 */
$.fn.visualMotion = function (options){
    var BTN_MARGIN = 5, BTN_WIDTH = 13, BTN_SIZE = BTN_MARGIN + BTN_WIDTH,
        START_INDEX = 0,
        isMotioning = false,
        defaults = {
            'duration'  : 500,
            'term'      : 4000,
            'offset'    : START_INDEX,
            'roof'      : true,
            'auto'      : true,
            'fill'      : true,
            'effect'    : 'none',       //'fade', 'slide', 'none'
            'type'      : 'banner'     //'banner', 'photo, 'date',
        },
        config = $.extend(true, defaults , options);

    var $wrap = $(this[0]), $area = $wrap.parent(), w = $area.width(), h = $area.height(), r = w/h,
        $arrow = $wrap.find('button.btn-prev , button.btn-next'), $control = $wrap.find('button.btn-play, button.btn-pause'),
        $itemWraps = $wrap.find('>.item-wrap'), len = $itemWraps.length,
        startLeft = parseInt( (w - (((len + 1) * BTN_WIDTH) + (len * BTN_MARGIN)))/2),
        timer, cIndex = config.offset, motion_queue = [],
        $thumbnailWrap = $area.find( '.thumbnail-wrap' ),
        $thumbnailItem = $thumbnailWrap.find( 'li' );

    // init
    $itemWraps.each(function(i, v){
        var $itemWrap = $(v), $item = $itemWrap.find('>.item'), $indicator = $itemWrap.find('>button');

        if(i != cIndex){
            $item.css({'width':w, 'height':h, 'display':'none'});
            unActiveLink($item);
        } else {
            $item.css({'width':w, 'height':h});
            $indicator.addClass('on').attr('title', '선택');
        }

        if(config.type === 'banner'){
            $item.find('img').css({'width' : '100%', 'height' : '100%'});
        }
    });

    //app.log('visual Motion > config.type : ' + config.type + ', ' + cIndex);
    if(config.type === 'photo') {
        preLoadImage(cIndex);
    }

    // arrow button
    $arrow.on('click', function (e) {
        //app.log('e: click arrow' + isMotioning);
        if(isMotioning) return;


        var $arrowBtn = $(this);
        //app.log($arrowBtn);

        if($arrowBtn.hasClass('dim')) return;

        isMotioning = true;


        pause();
        mIndex = $arrowBtn.hasClass('btn-prev') ? -1 : 1;
        move(getIndex(mIndex));
    });

    if(!config.roof){
        //app.log('## config.roof');
        setArrow(cIndex);
    }

    config.auto && play();

    // play, pause control
    $control.css({'left' : startLeft + (len * BTN_SIZE), 'display' : 'block'}).on('click', function (){
        //app.log('e: click control');
        if($control.hasClass('btn-pause')){ // do pause
            pause();
        } else { // do play
            play();
        }
        return false;
    });

    // set indicator.
    $itemWraps.find('> button').each(function(i, v){
        var $b = $(v), left = startLeft + (BTN_SIZE * i);
        $b.css({left: left, 'display' : 'block'}).data('index', i);
    }).on('click', function () {
        //app.log('e: click indicator');
        var sIndex = $(this).data('index');         // select indicator index.
        if(isMotioning || cIndex === sIndex) return;
        isMotioning = true;
        pause();
        move(sIndex);
    });

    //thumbnail
    if(  $thumbnailWrap.length > 0 ) {
        var tummbanilItemLength = $thumbnailItem.length,
            tw = parseInt( ( w / tummbanilItemLength ) / 1.5 , 10 ); //25% 축소

        $thumbnailItem.first().addClass( 'on' );

        $thumbnailItem.each( function( i ) {
            var $this = $( this ),
                $el = $this.find( 'a' );

            $this.css( 'width' , tw + 'px' );
        });

        thumbnail();
    }

    function preLoadImage (_index) {
        loadImage($itemWraps.eq(cIndex).find('img'));
        loadImage($itemWraps.eq(getIndex(1)).find('img'));
        loadImage($itemWraps.eq(getIndex(-1)).find('img'));

        function loadImage (_$img) {

            if(!_$img.length) return;
            var img = _$img[0], src = '', tempImage = new Image(), src = _$img.data('src');

            if(!img.src){
                tempImage.onload = function () {
                    //app.log('src : ' + this.src + ', w : ' + this.width + ', h : ' + this.height);
                    var imgW = this.width, imgH = this.height, imgR = imgW/imgH;

                    if(r > imgR){
                        if(h < imgH) {
                            _$img.css({'height': '100%'});
                        } else {
                            _$img.css({'margin-top': (h - imgH) / 2});
                        }
                    } else {
                        if(w < imgW) {
                            _$img.css({'width': '100%', 'margin-top': (h - parseInt(w / imgR, 10)) / 2});
                        } else {
                            _$img.css({'margin-top': (h - imgH) / 2 + 'px'});
                        }
                    }
                    _$img.attr('src', src);
                };
                tempImage.src = src;
            }
        }
    }

    // a : remove attribute href, iframe : remove attribute src
    function unActiveLink($t) {
        if(!$t.length) return;
        var tag = $t[0].tagName;
        if(tag == 'A'){
            $t.data('href', $t.attr('href')).removeAttr('href');
        } else {
            $t.data('src', $t.attr('src')).removeAttr('src');
            $t.attr('src', $t.data('src'));
        }
    }

    function activeLink($t) {
        $t.attr('href', $t.data('href'));
    }

    function getIndex(m){
        var move = cIndex + m, min = 0, max = len - 1;
        if(move < min){
            move = max;
        } else if(move >= len) {
            move = min;
        }
        return move;
    }

    function play() {
        //app.log('## do play');
        if($control.hasClass('btn-play')){
            $control.removeClass('btn-play').addClass('btn-pause').text('일시멈춤');
            if(config.auto){
                config.auto = false;
            } else {
                move(getIndex(1));
            }
            timer = setInterval(function (){
			    move(getIndex(1));
                if(!config.roof && getIndex(1) === (len - 1)){
                    //app.log('## setInterval pause');
                    pause();
                    return;
                }
		    }, config.duration + config.term);

            $thumbnailItem.removeClass( 'active' );
        }
    }

    function pause() {
        clearInterval(timer);
        if($control.hasClass('btn-pause')){
            //app.log('## do pause');
            $control.removeClass('btn-pause').addClass('btn-play').text('자동 넘기기 시작');
        }
    }

    function move(_moveIndex){
        doBefore(_moveIndex);
        $itemWraps.find('>button').removeClass('on').removeAttr('title').eq(_moveIndex).addClass('on').attr('title', '선택됨.');    // active indicator.
        var exec = function () {};
        switch (config.effect){
            case 'fade' : exec = fade; break;
            case 'slide' : exec = slide; break;
            default : exec = noneEffect; break;
        }
        exec(_moveIndex);
        if(config.type === 'photo') {
            preLoadImage(_moveIndex);
        }

        if( $thumbnailWrap.length > 0 ) {
            $thumbnailItem.eq( _moveIndex ).addClass( 'on' ).siblings().removeClass( 'on' );
        }
    }

    function noneEffect (_moveIndex) {
        var $nli = $itemWraps.eq(_moveIndex);
        $itemWraps.eq(cIndex).find('.item').hide();
        $nli.addClass('move').find('.item').show(0, function(){
            unActiveLink($itemWraps.eq(cIndex).find('.item'));
            activeLink($nli.find('.item'));
            cIndex = _moveIndex;
            $itemWraps.removeClass('on').not(':eq(' + cIndex + ')').find('.item').hide();
            $nli.removeClass('move').addClass('on');
            isMotioning = false;
            doCallback();
        });
        $wrap.data('index', _moveIndex);
    }

    function fade(_moveIndex){
        var $nli = $itemWraps.eq(_moveIndex);
        $nli.addClass('move').find('.item').fadeIn(500, function(){
            unActiveLink($itemWraps.eq(cIndex).find('.item'));
            activeLink($nli.find('.item'));
            cIndex = _moveIndex;
            $itemWraps.removeClass('on').not(':eq(' + cIndex + ')').find('.item').hide();
            $nli.removeClass('move').addClass('on');
            isMotioning = false;
            doCallback();
        });
        $wrap.data('index', _moveIndex);
    }

    function slide (_moveIndex) {
        var $nli = $itemWraps.eq(_moveIndex);
        $nli.addClass('move').find('.item').show().css({'left': w});   // 좌/우 방향 컨트롤 위치.
        $itemWraps.filter(function(i, v){return i == cIndex || i == _moveIndex;}).find('>.item').animate({left : '-=' + w, easing : 'easeOutQuart'}, config.duration, function (){
            unActiveLink($itemWraps.eq(cIndex).find('.item'));
            activeLink($nli.find('.item'));
            cIndex = _moveIndex;
            $itemWraps.removeClass('on').not(':eq(' + cIndex + ')').find('.item').hide();
            $nli.removeClass('move').addClass('on').find('.item');
            isMotioning = false;
            doCallback();
        });
        $wrap.data('index', _moveIndex);
    }

    function setArrow (_moveIndex) {

        var $prev = $arrow.first(), $next = $arrow.last();
        if(_moveIndex === 0){
            $prev.addClass('dim');
            $next.removeClass('dim');
        } else if (_moveIndex === (len - 1)){
            $prev.removeClass('dim');
            $next.addClass('dim');
        } else {
            $prev.removeClass('dim');
            $next.removeClass('dim');
        }
    }

    function doBefore(_moveIndex){
        config.onBeforeHandler && config.onBeforeHandler(_moveIndex);
        if(!config.roof){
            setArrow(_moveIndex);
        }
    }

    function doCallback(){
        config.callback && config.callback(cIndex);
    }

    function thumbnail() {
        $thumbnailItem.find( 'a' ).on( 'click' , function( e ) {
            e.preventDefault();

            var $this = $( this ),
                $li = $this.closest( 'li' ),
                index = $thumbnailItem.index( $li );

            pause();
            move( index );
            $li.addClass( 'active' ).siblings().removeClass( 'active' );
        });
    }

    return {'pause' : pause};
};

/*
 * @name : jquery.rangeSlider
*/
$.fn.rangeSlider = function ( options ) {
	return this.each( function() {
		var $this = $( this ),
			defaults = {
				range : 'min',
				max : 10,
				min : 0
			},
			datas = $this.data(),
			config = $.extend( defaults , options || {}),
			$control = $this.closest( '.control' );

		$this.slider( config )
			.on( 'slide' , function( event , ui ) {
				config.onSlide && config.onSlide( ui.value );

				setTickTitle( ui );
			})
			.on( 'slidechange' , function( event, ui ) {

				config.onChange && config.onChange( ui.value );

				setTickTitle( ui );
			});

		$control.find( '.Mbtn' ).on( 'click' , function( event ){
			event.preventDefault();

			var $target = $( event.target ),
				min = $this.slider( 'option' , min ),
				value = $this.slider( 'value' ),
				resultValue = value - 1 < min ? min : value - 1;

			$this.slider( 'value' , resultValue );

			config.onChange && config.onChange( resultValue );
		});
		$control.find( '.Pbtn' ).on( 'click', function( event ){
			event.preventDefault();

			var $target = $( event.target ),
				max = $this.slider( 'option' , max ),
				value = $this.slider( 'value' ),
				resultValue = value + 1 > max ? max : value + 1;

			$this.slider( 'value' , resultValue );

			config.onChange && config.onChange( resultValue );
		});

		function setTickTitle( obj ) {
			var $tick = $( obj.handle ),
				//value = ( obj.value * config.max ) + '%';
				value = obj.value;

			$tick.attr( 'title' , value );
		}
	});
};

})( jQuery, window, document );
