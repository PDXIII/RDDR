
/*globals jQuery, document */


	// function increaseFontSize ( _selector, _fontSize) {
	// 'use strict';
	// 	jQuery(_selector).css({
	// 		fontSize : _fontSize + 'px',
	// 		lineHeight: _fontSize + 'px'
	// 	})
	// }

	// function parseFontSize (_fontSize) {
	// 'use strict';
	// 	var fontSize = _fontSize.split('px')[0];
	// 	var fontFloat = parseFloat(fontSize);
	// 	return fontFloat
	// }


	// function decreaseFontSize (_selector) {
	// 'use strict';
	// 	jQuery(_selector).animate({
	// 		fontSize: 14 + 'px',
	// 		lineHeight: 14 + 'px'
	// 	},
	// 	{
	// 		duration: 'slow',
	// 		easing: 'easeOutElastic'
	// 	})
	// }

	// function getDirection (_ui) {
	// 'use strict';
	// 	// could be left right up down
	// 	var direction = [];
	// 	// horizontal
	// 	if( Math.abs(_ui.originalPosition.left - _ui.position.left) > Math.abs(_ui.originalPosition.top - _ui.position.top)){
	// 		direction.push('x');
	// 		// left
	// 		if (_ui.originalPosition.left > _ui.position.left) {
	// 			direction.push('left');
	// 		}
	// 		// right
	// 		else{
	// 			direction.push('right');
	// 		}
	// 	}
	// 	//vertikal
	// 	else{
	// 		direction.push('y');
	// 		// up
	// 		if (_ui.originalPosition.top > _ui.position.top) {
	// 			direction.push('up');
	// 		}
	// 		// down
	// 		else{
	// 			direction.push('down');
	// 		}
	// 	}
	// 	// console.log(direction);
	// 	return direction;
	// }

jQuery( document ).ready(function ($) {
	// 'use strict';
	console.log('jquery ready');
	$('attribute_left').html('yeah');

	
		//	following functions are page specific
		$('#15').on('click',function () {
			console.log('click');
		});
			// var direction;
			// $('.draggable').draggable({ 
			// 	// axis: 'x', 
			// 	containment: 'parent',
			// 	cursor: 'hand',
			// 	start: function (event, ui) {
			// 	},
			// 	drag: function (event, ui) {
			// 		var distance;
			// 		direction = getDirection(ui);
			// 		$(this).draggable( "option", "axis", direction[0] );
			// 		if(direction[0] === 'x'){
			// 			distance = Math.abs(ui.originalPosition.left - parseFontSize($(this).css('left')));
			// 		}
			// 		else{
			// 			distance = Math.abs(ui.originalPosition.top - parseFontSize($(this).css('top')));
			// 		}
			// 		if(distance > 50){
			// 			$(this).css({
			// 				backgroundColor: 'black'
			// 			});
			// 		}
			// 		increaseFontSize('#attribute-' + direction[1], distance/2);
			// 		// console.log('left position: ' + $(this).css('left'));
			// 		// console.log('right position: ' + $(this).css('right'));
			// 	},
			// 	stop: function (event, ui) {
			// 		$(this).animate({
			// 			top: ui.originalPosition.top,
			// 			left: ui.originalPosition.left,
			// 			backgroundColor: 'red'
			// 		},
			// 		{
			// 			duration: 'slow',
			// 			easing: 'easeOutElastic'
			// 		});
			// 		decreaseFontSize('#attribute-' + direction[1]);
			// 		direction = null;
			// 		$('.attribute').removeAttr('style');
			// 	}
			// });
		
});
