/**
 * FlipPage: Tournez les pages sur votre iPad
 * http://flippage.marcbuils.fr
 * 
 * Par Marc Buils ( mbuils@marcbuils.fr )
 * Sous licence LGPL v3 (http://www.gnu.org/licenses/lgpl-3.0.txt)
 */
(function( $ ){
	$.flippage = {};
	$.flippage.options = {
		width: 		200,
		height:		150,
		shadowSize:	12
	};
	
	$.fn.flippage = function( p_options ){
		var _options = $.extend({}, $.flippage.options, p_options );
		_options.width = _options.width/2;
		
		return this.each( function(){
			var $this = $(this);
			var _pos = {};
			
			$this.addClass('flippage').css({
				width: _options.width*2,
				height: _options.height
			}).children('div:not(.flippage_page)').each(function(){
				$this.append( $('<div></div>')
								.addClass('flippage_page')
								.css( {
									width: 	_options.width,
									height:	_options.height
								} )
								.append( $(this).css( {
											width: 	_options.width,
											height:	_options.height
										} )
								)
				);
			});
			
			var _current = 0;	
			var _draggingRight = false;
			var _draggingLeft = false;
			
			var _pageFlippable = function( p_current ) {
				_draggingRight = false;
				_draggingLeft = false;
				
				// Access during end animation
				if ( p_current < 0 || p_current > $this.find('div').size()-1 ) {
					return;
				}
				
				_current = p_current;
				$this.find('div')	.css('-moz-transition', 'none')
									.css('-webkit-transition', 'none')
									.css('-o-transition', 'none')
									.css('-ms-transition', 'none')
									.css('transition', 'none');
				$this.find('div > div')	.css('-moz-transition', 'none')
									.css('-webkit-transition', 'none')
									.css('-o-transition', 'none')
									.css('-ms-transition', 'none')
									.css('transition', 'none')
									.css('margin-left', '0px');

				$this.find('.flippage_rshadow').remove();
				$this.find('.flippage_lshadow').remove();
				$this.children('div:lt('+(_current)+')').hide();
				$this.children('div')	.unbind('mousedown');
				$this.children('div:gt('+(_current+1)+')').hide();
				$this.children('div').eq( _current ).css( { left: 0 } );
				$this.children('div').eq( _current+1 ).css( { left: _options.width  } );
				
				if ( $this.children('div').eq( _current+2 ).size() > 0 ){
					$this.children('div').eq( _current+1 ).bind('mousedown', function( p_e ){
						if ( !_draggingLeft && !_draggingRight ){
							var $_p1 = $this.children('div').eq( _current );
							var $_p2 = $this.children('div').eq( _current+1 );
							var $_p3 = $this.children('div').eq( _current+2 );
							var $_p4 = $this.children('div').eq( _current+3 );
							
							$this.addClass('flippage_flipping');
							_pos.left = p_e.pageX - p_e.layerX - _options.width;
							$_p1.css( { zIndex: 1, left: 0 } );
							$_p2.css( { zIndex: 3, left: _options.width  } );
							$_p3.css( { zIndex: 4, left: _options.width*2, width: 0,								
								webkitBoxShadow: '-'+_options.shadowSize+'px 0px '+_options.shadowSize+'px rgb(170, 170, 170)',
								mozBoxShadow: '-'+_options.shadowSize+'px 0px '+_options.shadowSize+'px rgb(170, 170, 170)',
								oBoxShadow: '-'+_options.shadowSize+'px 0px '+_options.shadowSize+'px rgb(170, 170, 170)',
								msBoxShadow: '-'+_options.shadowSize+'px 0px '+_options.shadowSize+'px rgb(170, 170, 170)',
								boxShadow: '-'+_options.shadowSize+'px 0px '+_options.shadowSize+'px rgb(170, 170, 170)'
							} ).append( $('<div></div>').addClass('flippage_rshadow').css( {
									width: 	_options.width,
									height:	_options.height,
									opacity: 1,
									right: 0
								} )
							);
							$_p4.css( { zIndex: 2, left: _options.width, width: _options.width } );
							
							_draggingRight = true;
							$_p3.show();
							$_p4.show();
						}
						
						return false;
					});
				}
				
				if ( _current > 0 ){
					$this.children('div').eq( _current ).bind('mousedown', function( p_e ){
						if ( !_draggingRight && !_draggingLeft ){
							var $_p1 = $this.children('div').eq( _current+1 );
							var $_p2 = $this.children('div').eq( _current );
							var $_p3 = $this.children('div').eq( _current-1 );
							var $_p4 = $this.children('div').eq( _current-2 );

							$this.addClass('flippage_flipping');
							_pos.left = p_e.pageX - p_e.layerX;
							$_p1.css( { zIndex: 1, left: _options.width } );
							$_p2.show().css({
								zIndex: 3, 
								left: 0,
								width: _options.width
							}).children('div:eq(0)').css({
								marginLeft: 0
							});
							$_p3.css( { zIndex: 4, left: 0, width: 0,								
								webkitBoxShadow: ''+_options.shadowSize+'px 0px '+_options.shadowSize+'px rgb(170, 170, 170)',
								mozBoxShadow: ''+_options.shadowSize+'px 0px '+_options.shadowSize+'px rgb(170, 170, 170)',
								oBoxShadow: ''+_options.shadowSize+'px 0px '+_options.shadowSize+'px rgb(170, 170, 170)',
								msBoxShadow: ''+_options.shadowSize+'px 0px '+_options.shadowSize+'px rgb(170, 170, 170)',
								boxShadow: ''+_options.shadowSize+'px 0px '+_options.shadowSize+'px rgb(170, 170, 170)'
							} )	.append( $('<div></div>').addClass('flippage_lshadow').css( {
									width: 	_options.width,
									height:	_options.height,
									opacity: 1,
									right: -1 * _options.width
								} )
							).children('div:eq(0)').css( {
								marginLeft: _options.height * -1
							});
							$_p4.css( { zIndex: 2, left: 0, width: _options.width } );
							
							_draggingLeft = true;
							$_p3.show();
							$_p4.show();
						}
						
						return false;
					});
				}
			};
			_pageFlippable(0);
			
			$(document).bind('mousemove', function( p_e ){
					//var _pos = $this.position();
					
					if ( _draggingRight ){
						var $_p2 = $this.children('div').eq( _current+1 );
						var $_p3 = $this.children('div').eq( _current+2 );
						
						if ( p_e.pageX < _pos.left ) {
							$_p2.hide().css({
								width: 0
							});
							$_p3.css({
								left: 0,
								width: _options.width,
								webkitBoxShadow: 'none',
								mozBoxShadow: 'none',
								oBoxShadow: 'none',
								msBoxShadow: 'none',
								boxShadow: 'none'
							});
						} else if ( p_e.pageX-_pos.left < _options.width ) {
							var _shadow = (((p_e.pageX-_pos.left)/(_options.width*2)))*_options.shadowSize;
								
							$_p2.hide().css({
								width: 0
							});
							$_p3.css({
								left: p_e.pageX-_pos.left,
								width: _options.width - ((p_e.pageX-_pos.left)/2),
								webkitBoxShadow: '-'+_shadow+'px 0px '+_shadow+'px rgb(170, 170, 170)',
								mozBoxShadow: '-'+_shadow+'px 0px '+_shadow+'px rgb(170, 170, 170)',
								oBoxShadow: '-'+_shadow+'px 0px '+_shadow+'px rgb(170, 170, 170)',
								msBoxShadow: '-'+_shadow+'px 0px '+_shadow+'px rgb(170, 170, 170)',
								boxShadow: '-'+_shadow+'px 0px '+_shadow+'px rgb(170, 170, 170)'
							});
						} else if (p_e.pageX-_pos.left > _options.width*2){
							$_p2.show().css({
								width: _options.width
							});
							
							$_p3.css({
								left: _options.width*2,
								width: 0,
								webkitBoxShadow: 'none',
								mozBoxShadow: 'none',
								oBoxShadow: 'none',
								msBoxShadow: 'none',
								boxShadow: 'none'
							});
						} else {
							var _shadow = (1-((_options.width*2 - (p_e.pageX-_pos.left)))/(_options.width*2))*_options.shadowSize;
							
							$_p2.show().css({
								width: p_e.pageX-_pos.left - _options.width
							});
							
							$_p3.css({
								left: p_e.pageX-_pos.left,
								width: _options.width - (p_e.pageX-_pos.left)/2,
								webkitBoxShadow: '-'+_shadow+'px 0px '+_shadow+'px rgb(170, 170, 170)',
								mozBoxShadow: '-'+_shadow+'px 0px '+_shadow+'px rgb(170, 170, 170)',
								oBoxShadow: '-'+_shadow+'px 0px '+_shadow+'px rgb(170, 170, 170)',
								msBoxShadow: '-'+_shadow+'px 0px '+_shadow+'px rgb(170, 170, 170)',
								boxShadow: '-'+_shadow+'px 0px '+_shadow+'px rgb(170, 170, 170)'
							});
						}
						
						$_p3.children('.flippage_rshadow').css( { 
							opacity: 1-($_p3.width()/_options.width)
						} );
					} else if ( _draggingLeft ){
						var $_p2 = $this.children('div').eq( _current );
						var $_p3 = $this.children('div').eq( _current-1 );
						
						if ( p_e.pageX-_pos.left > _options.width && p_e.pageX-_pos.left < _options.width*2) {
							var _shadow = ((_options.width*2 - (p_e.pageX-_pos.left))/_options.width)*_options.shadowSize;

							$_p2.hide().css({
								width: 0,
								left: _options.width
							}).children('div:eq(0)').css({
								marginLeft: _options.width*-1
							});
							$_p3.css({
								left: (p_e.pageX-_pos.left)/2,
								width: (p_e.pageX-_pos.left)/2,
								webkitBoxShadow: ''+_shadow+'px 0px '+_shadow+'px rgb(170, 170, 170)',
								mozBoxShadow: ''+_shadow+'px 0px '+_shadow+'px rgb(170, 170, 170)',
								oBoxShadow: ''+_shadow+'px 0px '+_shadow+'px rgb(170, 170, 170)',
								msBoxShadow: ''+_shadow+'px 0px '+_shadow+'px rgb(170, 170, 170)',
								boxShadow: ''+_shadow+'px 0px '+_shadow+'px rgb(170, 170, 170)'
							}).children('div:eq(0)').css({
								marginLeft: (p_e.pageX-_pos.left)/2 - _options.width
							});
						} else if (p_e.pageX-_pos.left >= _options.width*2){
							$_p2.hide().css({
								width: 0,
								left: _options.width
							}).children('div:eq(0)').css({
								marginLeft: _options.width*-1
							});
							
							$_p3.css({
								left: _options.width,
								width: _options.width,
								webkitBoxShadow: 'none',
								mozBoxShadow: 'none',
								oBoxShadow: 'none',
								msBoxShadow: 'none',
								boxShadow: 'none'
							}).children('div:eq(0)').css({
								marginLeft: 0
							});
						} else if (p_e.pageX <= _pos.left) {
							$_p2.show().css({
								width: _options.width,
								left: 0
							}).children('div:eq(0)').css({
								marginLeft: 0
							});
							
							$_p3.css({
								left: 0,
								width: 0,
								webkitBoxShadow: 'none',
								mozBoxShadow: 'none',
								oBoxShadow: 'none',
								msBoxShadow: 'none',
								boxShadow: 'none'
							}).children('div:eq(0)').css({
								marginLeft: -1*_options.width
							});
						} else {
							var _shadow = (1-((p_e.pageX-_pos.left)/(_options.width*2)))*_options.shadowSize;
							
							$_p2.show().css({
								width: _options.width-(p_e.pageX-_pos.left),
								left: p_e.pageX-_pos.left
							}).children('div:eq(0)').css({
								marginLeft: (p_e.pageX-_pos.left)*-1
							});
							
							$_p3.css({
								left: (p_e.pageX-_pos.left)/2,
								width: (p_e.pageX-_pos.left)/2,
								webkitBoxShadow: ''+_shadow+'px 0px '+_shadow+'px rgb(170, 170, 170)',
								mozBoxShadow: ''+_shadow+'px 0px '+_shadow+'px rgb(170, 170, 170)',
								oBoxShadow: ''+_shadow+'px 0px '+_shadow+'px rgb(170, 170, 170)',
								msBoxShadow: ''+_shadow+'px 0px '+_shadow+'px rgb(170, 170, 170)',
								boxShadow: ''+_shadow+'px 0px '+_shadow+'px rgb(170, 170, 170)'
							}).children('div:eq(0)').css({
								marginLeft: (p_e.pageX-_pos.left)/2 - _options.width
							});
						}
						
						$_p3.children('.flippage_lshadow').css( { 
							right: $_p3.width() - _options.width,
							opacity: 1-($_p3.width()/_options.width)
						} );
					}
				})
				.bind('mouseup', function(p_e){
					if (_draggingRight) {
						var $_p2 = $this.children('div').eq( _current+1 );
						var $_p3 = $this.children('div').eq( _current+2 );
						
						$this.removeClass('flippage_flipping');
						$_p3.css('-moz-transition', 'all 0.5s ease-in')
							.css('-webkit-transition', 'all 0.5s ease-in')
							.css('-o-transition', 'all 0.5s ease-in')
							.css('-ms-transition', 'all 0.5s ease-in')
							.css('transition', 'all 0.5s ease-in')
							.css( {
								left: 0,
								width: _options.width,
								webkitBoxShadow: 'none',
								mozBoxShadow: 'none',
								oBoxShadow: 'none',
								msBoxShadow: 'none',
								boxShadow: 'none'
								
						} ).children('.flippage_rshadow')
							.css('-moz-transition', 'all 0.5s ease-in')
							.css('-webkit-transition', 'all 0.5s ease-in')
							.css('-o-transition', 'all 0.5s ease-in')
							.css('-ms-transition', 'all 0.5s ease-in')
							.css('transition', 'all 0.5s ease-in')
							.css( {
								opacity: 0,
								right: (_options.width)*-1
						} );
						
						$_p2.css('-moz-transition', 'all 0.5s ease-in')
							.css('-webkit-transition', 'all 0.5s ease-in')
							.css('-o-transition', 'all 0.5s ease-in')
							.css('-ms-transition', 'all 0.5s ease-in')
							.css('transition', 'all 0.5s ease-in')
							.css( {
								width: 0
						} );
						
						_draggingRight = false;
						setTimeout(function(){
							_pageFlippable( _current+2 );
						}, 500);
					} else if (_draggingLeft) {
						var $_p2 = $this.children('div').eq( _current );
						var $_p3 = $this.children('div').eq( _current-1 );
						
						$this.removeClass('flippage_flipping');
						$_p3.css('-moz-transition', 'all 0.5s ease-in')
							.css('-webkit-transition', 'all 0.5s ease-in')
							.css('-o-transition', 'all 0.5s ease-in')
							.css('-ms-transition', 'all 0.5s ease-in')
							.css('transition', 'all 0.5s ease-in')
							.css( {
								left: _options.width,
								width: _options.width,
								webkitBoxShadow: 'none',
								mozBoxShadow: 'none',
								oBoxShadow: 'none',
								msBoxShadow: 'none',
								boxShadow: 'none'
								
						} ).children('.flippage_lshadow')
							.css('-moz-transition', 'all 0.5s ease-in')
							.css('-webkit-transition', 'all 0.5s ease-in')
							.css('-o-transition', 'all 0.5s ease-in')
							.css('-ms-transition', 'all 0.5s ease-in')
							.css('transition', 'all 0.5s ease-in')
							.css( {
								opacity: 0,
								right: 0
						} );
						$_p3.children('div:eq(0)')
							.css('-moz-transition', 'all 0.5s ease-in')
							.css('-webkit-transition', 'all 0.5s ease-in')
							.css('-o-transition', 'all 0.5s ease-in')
							.css('-ms-transition', 'all 0.5s ease-in')
							.css('transition', 'all 0.5s ease-in')
							.css( {
								marginLeft: 0
							} );
						
						$_p2.css('-moz-transition', 'all 0.5s ease-in')
							.css('-webkit-transition', 'all 0.5s ease-in')
							.css('-o-transition', 'all 0.5s ease-in')
							.css('-ms-transition', 'all 0.5s ease-in')
							.css('transition', 'all 0.5s ease-in')
							.css( {
								width: 0,
								left: _options.width
						} ).children('div:eq(0)')
							.css('-moz-transition', 'all 0.5s ease-in')
							.css('-webkit-transition', 'all 0.5s ease-in')
							.css('-o-transition', 'all 0.5s ease-in')
							.css('-ms-transition', 'all 0.5s ease-in')
							.css('transition', 'all 0.5s ease-in')
							.css({
								marginLeft: _options.width*-1
						});
						
						_draggingLeft = false;
						setTimeout(function(){
							_pageFlippable( _current-2 );
						}, 500);
					}
				});
		} );
	};
	
	$(document).ready(function(){
		function touchHandler(event)
		{
		    var touches = event.changedTouches,
		        first = touches[0],
		        type = "";
		         switch(event.type)
		    {
		        case "touchstart": type = "mousedown"; break;
		        case "touchmove":  type="mousemove"; break;        
		        case "touchend":   type="mouseup"; break;
		        default: return;
		    }

		    var simulatedEvent = document.createEvent("MouseEvent");
		    simulatedEvent.initMouseEvent(type, true, true, window, 1, 
		                              first.screenX, first.screenY, 
		                              first.clientX, first.clientY, false, 
		                              false, false, false, 0/*left*/, null);

		    first.target.dispatchEvent(simulatedEvent);
		    
		    if ( $('.flippage_flipping').size() > 0 ) {
		    	event.preventDefault();
		    }
		}

	    document.addEventListener("touchstart", touchHandler, true);
	    document.addEventListener("touchmove", touchHandler, true);
	    document.addEventListener("touchend", touchHandler, true);
	    document.addEventListener("touchcancel", touchHandler, true);    
	});
})(jQuery);