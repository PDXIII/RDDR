// Config
Framer.config.animationPrecision = 60;
// Layer naming an position saving stuff
for (var layerGroupName in PSD) {
	window[layerGroupName] = PSD[layerGroupName];
	PSD[layerGroupName].originalFrame = window[layerGroupName].frame;
}

// variables

var pink = '#172d4d';
var darkBlue = '#ff00c1';
var resultDotSize = 90;
var menuVisible = false;
var globalDirection, globalDistance;
var globalAnimationCurve = 'spring(400,10,500)';
var minAttrSize = 24;
var maxAttrSize = 36;
var minActionSize = 0;
var maxActionSize = 36;
var startCurve = 'ease-in-out';
var startTime = 150;
var startSpring = 'spring(200,15,600)';
var infoGuiSize = [110, 30, 10]; // width, height, margin of a button
var questionIndex, pairIndex, objIndex;
var designObject;

var maxDistance = 155;
var triggerOffset = 5;

function addResultBG (_superView, _resultVote, _resultPercent) {
	var newView01 = new View ({
		width: resultDotSize,
		height: resultDotSize,
		x: 0,
		y: 0,
		style:{
			// backgroundColor: pink,
			opacity: returnOpacity(_resultPercent)
		}
	});
	newView01.sendToBack();
	newView01.addClass('colorLayer');
	_superView.addSubView(newView01);

		var newView02 = new View ({
		width: resultDotSize,
		height: resultDotSize,
		x: 0,
		y: 30,
		html: _resultVote
	});
	newView02.sendToBack();
	newView02.addClass('resultlabel');
	_superView.addSubView(newView02);
}

function addGenom (_objIndex, _dnaIndex, index){
	var genom = new View({
		width: 348,
		height: 30,
		x: 0,
		y: 30*index +30,
	});
	var leftPair = new View({
		width: 140,
		height: 30,
		x: 0,
		y: 0,
		html: db.questions[_dnaIndex].pairs[index][0]
	});
	leftPair.addClass('pair left');
	genom.addSubView(leftPair);

	var valInPercent = returnPercent(db.objects[_objIndex].dna[_dnaIndex].pairs[index]);
	for (var i = 0; i < valInPercent.length; i++){
		var miniResult = new View({
			width: 15,
			height: 15,
			x: i*19 + 148,
			y: 7,
			opacity: returnOpacity(valInPercent[i])
		});
		miniResult.addClass('miniResult');
		genom.addSubView(miniResult);
	}
	var rightPair = new View({
		width: 140,
		height: 30,
		x: 208,
		y: 0,
		html: db.questions[_dnaIndex].pairs[index][1]
	});
	rightPair.addClass('pair right');
	genom.addSubView(rightPair);

	return genom;
}

function addKeyValueView(_objIndex, _key, _keyText, _viewIndex){
	var _currView = new View({
		width: 384,
		height: 30,
		x: 0,
		y: _viewIndex * 30 + 5
	});

	var keyView = new View({
		width: 128,
		height: 30,
		x: 0,
		y: 0,
		html: _keyText
	});
	keyView.addClass('keyView');
	_currView.addSubView(keyView);

	var valueView = new View({
		width: 200,
		height: 30,
		x: 140,
		y: 0,
		html: db.objects[_objIndex][_key]
	});
	valueView.addClass('valueView');
	_currView.addSubView(valueView);
	return _currView;
}

function addInfoHeadline (_headline) {
	var _currView = new View({
		width: 348,
		height: 30,
		x: 0,
		y: 0,
		html: _headline
	});
	_currView.addClass('infoHeadline');
	return _currView;
	// body...
}

function addToCluster () {
	// console.log('add to cluster');
	clusterLoop(0,-1,objIndex);
}

function clusterLoop (_questionIndex, _pairIndex, _objIndex) {
	clearScene();
	utils.delay(150, function (){
		if ( _questionIndex < db.questions.length-1){
			if (_pairIndex < db.questions[_questionIndex].pairs.length-1){
				// console.log(db.questions[_questionIndex].main + ' / ' + db.questions[_questionIndex].pairs[_pairIndex] + ' / ' + objIndex);
				_pairIndex++;
				makeClusterObj(_questionIndex, _pairIndex, _objIndex);
			}
			else{
				_pairIndex = 0;
				_questionIndex++;
				// console.log('Question: ' + _questionIndex);
				makeClusterObj(_questionIndex, _pairIndex, _objIndex);
			}
		}
		else{
			// _questionIndex = 0; 
			// console.log('ende im gelände');
			makeClusterIcons();
		}
	});
}

function makeClusterIcons(){
	var smallClusterIcons = new View({
		x: 0,
		y: 181,
		width: 384,
		height: 512
	});

	smallClusterIcons.addSubView(makeClusterQuestion());

	var icons = new View({
		x: 0,
		y: 41,
		width: smallClusterIcons.width,
		height: smallClusterIcons.height
	});

	for (var i = 0; i < db.SmallClusterIcons.length; i++) {
		console.log(db.SmallClusterIcons[i].name);
		var _currView = new ImageView ({
			opacity: 0,
			image: '../assets/ClusterImages/' + db.SmallClusterIcons[i].image,
			width: 81,
			height: 81,
			x: db.SmallClusterIcons[i].x,
			y: db.SmallClusterIcons[i].y + 41
		});
		_currView.addClass('smallClusterIcon btn');
		icons.addSubView(_currView);
	};
	smallClusterIcons.addSubView(icons);
	Scene.addSubView(smallClusterIcons);

	utils.delay(20, function () {
		smallClusterIcons._subViews[0].scale = 1.5;
		smallClusterIcons._subViews[0].animate({
				properties: {
					opacity: 1,
					scale: 1
				},
				curve: startSpring
			});
		});
	utils.delay(40, function () {
		icons._subViews.forEach(makeIconsVisible);
	});

	icons._subViews[5].on('click', function(){
		icons._subViews[5].scale = 0.7;
		icons._subViews[5].animate({
			properties: {
				scale:1
			},
			curve: startSpring
		});
		utils.delay(200,function(){
			icons._subViews.reverse().forEach(makeIconsInvisible);
		});
		utils.delay(1000, function (){
			smallClusterIcons._subViews[0].animate({
				properties:{
					opacity: 0,
					scale: 1.5
				},
				time: 200,
				curve: 'ease-in-out'
			});
		});
		utils.delay(2000, function () {
			// smallClusterIcons.destroy();
			makeObj();
		});
	});
}

var makeIconsVisible = function (_subView, index) {
	utils.delay(200 * index, function () {
		_subView.scale = 0.1;
		_subView.animate({
				properties: {
					scale: 1,
					opacity: 1
				},
				curve: globalAnimationCurve
			});
	});
}

var makeIconsInvisible = function (_subView, index) {
	utils.delay(200 * index, function () {
		_subView.animate({
				properties: {
					scale: 0,
					opacity: 0
				},
				curve: globalAnimationCurve
			});
	});
}

function makeClusterQuestion () {
	// console.log(_questionIndex);
	var mainQuestion = new View({
		opacity: 0,
		width: 384,
		height: 60,
		x: 0,
		y: 20,
		html: 'Welcher Cluster?'
	});
	mainQuestion.addClass('mainQuestion');
	return mainQuestion;
}

function animateObject (_currObj) {
	utils.delay(125, function () {
		// mainQuestion
		_currObj._subViews[0].animate({
			properties:{
				y: 20
			},
			curve: startCurve,
			time: startTime
		});
		utils.delay(100, function () {
			// oder label
			_currObj._subViews[1]._subViews[1].animate({
				properties:{
					opacity: 0.5,
					scale: 1
				},
				curve: startCurve,
				time: startTime
			});
			// left answer
			utils.delay(75, function () {
				_currObj._subViews[1]._subViews[0].animate({
					properties:{
						x: 0
					},
					curve: startCurve,
					time: startTime
				});
				// right answer
				utils.delay(75, function () {
					_currObj._subViews[1]._subViews[2].animate({
						properties:{
							x: 222
						},
						curve: startCurve,
						time: startTime
					});
					// dragObj
					utils.delay(100, function () {
						_currObj._subViews[4].animate({
							properties: {
								y: _currObj._subViews[4].originalFrame.y
							},
							curve: startSpring
						});
					});
				});
			});
		});
	});
}

function animateClusterObject (_currObj) {
	utils.delay(125, function () {
		// mainQuestion
		_currObj._subViews[0].animate({
			properties:{
				y: 20
			},
			curve: startCurve,
			time: startTime
		});
		utils.delay(100, function () {
			// oder label
			_currObj._subViews[1]._subViews[1].animate({
				properties:{
					opacity: 0.5,
					scale: 1
				},
				curve: startCurve,
				time: startTime
			});
			// left answer
			utils.delay(75, function () {
				_currObj._subViews[1]._subViews[0].animate({
					properties:{
						x: 0
					},
					curve: startCurve,
					time: startTime
				});
				// right answer
				utils.delay(75, function () {
					_currObj._subViews[1]._subViews[2].animate({
						properties:{
							x: 222
						},
						curve: startCurve,
						time: startTime
					});
					// dragObj
					utils.delay(100, function () {
						_currObj._subViews[2].animate({
							properties: {
								y: _currObj._subViews[2].originalFrame.y
							},
							curve: startSpring
						});
					});
				});
			});
		});
	});
}

function animateWords (_dragObj, _direction) {
	var direction = _direction;
	var distance;

	if(direction[0] === 'x') {
		_dragObj.y = _dragObj.originalFrame.y;
		distance = getXDistance(_dragObj);
			// tint and untint the _dragObj colorLayer
		if (distance >= maxDistance - triggerOffset) {
			_dragObj._subViews[1].opacity = 0.5;
		}
		 else{
			_dragObj._subViews[1].opacity = 0;
		}
		if(direction[1] === 'left') {
			_dragObj.superView._subViews[1]._subViews[0].style.fontSize = getFontSize(distance, 0, 155, minAttrSize, maxAttrSize);
			if(distance >= maxDistance ) {
				_dragObj.x = _dragObj.originalFrame.x - maxDistance;
			}
		}
		else if(direction[1] ==='right') {
			_dragObj.superView._subViews[1]._subViews[2].style.fontSize = getFontSize(distance, 0, 155, minAttrSize, maxAttrSize);
			if(distance >= maxDistance ) {
				_dragObj.x = _dragObj.originalFrame.x + maxDistance;
			}
		}
	}
	else{
		_dragObj.x = _dragObj.originalFrame.x;
		distance = getYDistance(_dragObj);
		if(direction[1] === 'up') {
				// tint and untint the _dragObj colorLayer
			if (distance >= 70 && distance <= 110 || distance >= maxDistance - triggerOffset) {
				_dragObj._subViews[1].opacity = 0.5;
			}
			 else{
				_dragObj._subViews[1].opacity = 0;
			}
			if( distance < 70){
				_dragObj.superView._subViews[2]._subViews[1].style.fontSize = getFontSize(distance, 0, 70, minActionSize, maxActionSize);
			}
			else if( distance >= 110 ){
				_dragObj.superView._subViews[2]._subViews[1].style.fontSize = getFontSize(distance, 110, 155, maxActionSize, minActionSize);
				_dragObj.superView._subViews[2]._subViews[2].style.fontSize = getFontSize(distance, 110, 155, minActionSize, maxActionSize);
			}
			if(distance >= maxDistance ) {
				_dragObj.y = _dragObj.originalFrame.y - maxDistance;
			}
		}
		else if (direction[1] === 'down') {
				// tint and untint the _dragObj colorLayer
			if (distance >= maxDistance - triggerOffset) {
				_dragObj._subViews[1].opacity = 0.5;
			}
			 else{
				_dragObj._subViews[1].opacity = 0;
			}
			_dragObj.superView._subViews[2]._subViews[0].style.fontSize = getFontSize(distance, 0, 155, minActionSize, maxActionSize);
			if(distance >= maxDistance ) {
				_dragObj.y = _dragObj.originalFrame.y + maxDistance;
			}
		}
	}

	// console.log(_dragObj.x + ' / ' + _dragObj.y + ' / ' + distance);
	globalDistance = distance;
	// console.log(globalDistance + ' / ' + globalDirection);
}

// is called by function dragObjReset()
function animateToSmallType (_currView, _minFontSize) {
	// console.log(_currView);
	$(_currView._element).animate({fontSize: _minFontSize}, 1200,'easeOutElastic');
}

// is called by function dragObjDisappears()
function animateResult (_results) {
	switch(globalDirection[1]) {
		case 'left':
			_results._subViews.forEach(makeResultVisible);
			break;
		case 'right':
			_results._subViews.reverse().forEach(makeResultVisible);
			break;
	}
	utils.delay(3000, function () {
		_results._subViews.reverse().forEach(makeResultInVisible);
		utils.delay(400, function () {
			nextObj();
		});
	});
}

// is called by function dragObjDisappears()
function bigAnswer (_answers) {
	_answers.animate({
		properties:{
			opacity: 0,
			scale: 1.5
		},
		time: 200,
		curve: 'ease-in-out'
	});
	utils.delay(200, function () {
		switch (globalDirection[1]) {
			case 'left':
				_answers.html = _answers._subViews[0].html;
				break;
			case 'right':
				_answers.html = _answers._subViews[2].html;
				break;
		}
		_answers._subViews.forEach(makeItInvisible);
		utils.delay(20, function () {
			_answers.animate({
				properties: {
					opacity: 1,
					scale: 1
				},
				curve: startSpring
			});
		});
	});
}

function changeHeadline (){
	console.log('change H2');
	TopBar._subViews[0]._subViews[1].animate({
		properties: {
			y: 0
		},
		curve: startCurve,
		time: startTime
	});

	utils.delay(100, function (){
		TopBar._subViews[0]._subViews[2].animate({
			properties: {
				y: 50
			},
			curve: startCurve,
			time: startTime
		});
	});
}

function changeHeadlineBack (){
	TopBar._subViews[0]._subViews[2].animate({
		properties: {
			y: 80
		},
		curve: startCurve,
		time: startTime
	});

	utils.delay(100, function (){
		TopBar._subViews[0]._subViews[1].animate({
			properties: {
				y: 57
			},
			curve: startCurve,
			time: startTime
		});
	});
}

// is called by function dragObjDisappears()
function changeMainQuestion (_mainQuestion) {
	_mainQuestion.animate({
		properties:{
			opacity: 0,
			scale: 1.5
		},
		time: 200,
		curve: 'ease-in-out'
	});
	// console.log(_mainQuestion);
	utils.delay(200, function () {
		_mainQuestion.html = 'Deine Antwort:';
		utils.delay(20, function () {
			_mainQuestion.animate({
				properties: {
					opacity: 1,
					scale: 1
				},
				curve: startSpring
			});
		});
	});
}

function dragObjDisappears (_dragObj) {
	switch (globalDirection[1]) {
		case 'left':
			_dragObj.animate({
				properties: {
					x: _dragObj.originalFrame.x - 700
				},
				curve: globalAnimationCurve
			});
			// Result.scale = 1;
			changeMainQuestion(_dragObj.superView._subViews[0]);
			bigAnswer(_dragObj.superView._subViews[1]);
			utils.delay(250, function () {
				animateResult(_dragObj.superView._subViews[3]);
			});
			break;
		case 'right':
			_dragObj.animate({
				properties: {
					x: _dragObj.originalFrame.x + 700
				},
				curve: globalAnimationCurve
			});
			// Result.scale = 1;
			changeMainQuestion(_dragObj.superView._subViews[0]);
			bigAnswer(_dragObj.superView._subViews[1]);
			utils.delay(250, function () {
				animateResult(_dragObj.superView._subViews[3]);
			});
			break;
		case 'up':
			_dragObj.animate({
				properties: {
					y: _dragObj.originalFrame.y - 700
				},
				curve: globalAnimationCurve
			});
			addToCluster();
			// window.location.reload()
			break;

		case 'down':
			_dragObj.animate({
				properties: {
					y: _dragObj.originalFrame.y + 700
				},
				curve: globalAnimationCurve
			});
			utils.delay(100, function () {
				nextObj();
			});
			// window.location.reload();
			break;
	}
}

function clusterDragObjDisappears (_dragObj, _questionIndex, _pairIndex, _objIndex) {
	switch (globalDirection[1]) {
		case 'left':
			_dragObj.animate({
				properties: {
					x: _dragObj.originalFrame.x - 700
				},
				curve: globalAnimationCurve
			});
			// Result.scale = 1;
			changeMainQuestion(_dragObj.superView._subViews[0]);
			bigAnswer(_dragObj.superView._subViews[1]);

			break;
		case 'right':
			_dragObj.animate({
				properties: {
					x: _dragObj.originalFrame.x + 700
				},
				curve: globalAnimationCurve
			});
			// Result.scale = 1;
			changeMainQuestion(_dragObj.superView._subViews[0]);
			bigAnswer(_dragObj.superView._subViews[1]);

			break;
	}

	utils.delay(1000, function(){
		clusterLoop(_questionIndex, _pairIndex, _objIndex);
	});
}

function dragObjReset (_dragObj) {
	_dragObj.animate({
		properties:{
			x: _dragObj.originalFrame.x,
			y: _dragObj.originalFrame.y
		},
		curve: globalAnimationCurve
	});
	_dragObj._subViews[1].opacity = 0;

	switch(globalDirection[1]) {
		case 'left':
			animateToSmallType(_dragObj.superView._subViews[1]._subViews[0], '24px');
			break;
		case 'right':
			animateToSmallType(_dragObj.superView._subViews[1]._subViews[2], '24px');
			break;
		case 'up':
			animateToSmallType(_dragObj.superView._subViews[2]._subViews[1], '0px');
			break;
		case 'down':
			animateToSmallType(_dragObj.superView._subViews[2]._subViews[0], '0px');
			break;
		}
}

function getRandomInt (min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getDirection (_dragObj) {
	var direction = [];
	// horizontal
	if( getXDistance(_dragObj) > getYDistance(_dragObj)) {
		direction.push('x');
		// left
		if (_dragObj.originalFrame.x > _dragObj.frame.x) {
			direction.push('left');
		}
		// right
		else{
			direction.push('right');
		}
	}
	// vertikal
	else{
		direction.push('y');
		// up
		if (_dragObj.originalFrame.y > _dragObj.frame.y) {
			direction.push('up');
		}
		// down
		else{
			direction.push('down');
		}
	}
	// console.log(direction);
	return direction;
}

// is called by function animateWords()
var getFontSize = function (_distance, _minDistance, _maxDistance, _minFontSize, _maxFontSize) {

	var attrFontSize = map_range(_distance, _minDistance, _maxDistance, _minFontSize, _maxFontSize);
	attrFontSize = attrFontSize + 'px';
	// console.log(attrFontSize);
	return attrFontSize;
};

var getScaleFactor = function (_distance, _low2) {
	var value = _distance;
	var low1 = 0;
	var high1 = maxDistance;
	// var low2 = 0.5;
	var low2 = _low2;
	var high2 = 1;

	return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
};

// is called by function getDirection()
function getXDistance (_dragObj) {
	var xDistance = Math.abs(_dragObj.originalFrame.x - _dragObj.x);
	return xDistance;
}

// is called by function getDirection()
function getYDistance (_dragObj) {
	var yDistance = Math.abs(_dragObj.originalFrame.y - _dragObj.y);
	return yDistance;
}

// called by function makeObj()
function makeActions () {
	var actions = new View({
		width: 384,
		height: 200,
		x: 0,
		y: 160
	});
	actions.addClass('actions');

	var skip = new View({
		origin: '50% 50%',
		width: 384,
		height: 52,
		x: 0,
		y: 0,
		html: 'überspringen',
		style:{
			fontSize: minActionSize +'px'
		}
	});
	skip.addClass('action skip');
	actions.addSubView(skip);

	var info = new View({
		origin: '50% 50%',
		width: 384,
		height: 52,
		x: 0,
		y: 144,
		html: 'informieren',
		style:{
			fontSize: minActionSize +'px'
		}
	});
	info.addClass('action moreInfo');
	actions.addSubView(info);

	var toCluster = new View({
		origin: '50% 50%',
		width: 384,
		height: 52,
		x: 0,
		y: 72,
		html: 'clustern',
		style:{
			fontSize: minActionSize +'px'
		}
	});
	toCluster.addClass('action toCluster');
	actions.addSubView(toCluster);
	return actions;
}

// called by function makeObj()
function makeAnswers (_questionIndex, _pairIndex) {
	var answers = new View({
		width: 384,
		height: 120,
		x: 0,
		y: 70
	});
	answers.addClass('answers');

	var leftAttr = new View({
		origin: '100% 50%',
		width: 162,
		height: 100,
		x: -162,
		y: 0,
		html: db.questions[_questionIndex].pairs[_pairIndex][0]
	});
	leftAttr.addClass('left attribute');
	answers.addSubView(leftAttr);

	var oder = new View({
		width: 60,
		height: 100,
		x: 162,
		y: 2,
		html: 'oder',
		style:{
			// scale: .1,
			opacity: 0
		}
	});
	oder.scale = 0;
	oder.addClass('label inactive');
	answers.addSubView(oder);

	var rightAttr = new View({
		origin: '0% 50%',
		width: 162,
		height: 100,
		x: 384,
		y: 0,
		html: db.questions[_questionIndex].pairs[_pairIndex][1]
	});
	rightAttr.addClass('right attribute');
	answers.addSubView(rightAttr);

	return answers;
}

function makeDNA (_objIndex, _dnaIndex, _headline){
	var dna = new View({
		width: 348,
		height: 180,
		x: 0,
		y: _dnaIndex*190
	});
	dna.addSubView(addInfoHeadline(_headline));
	for( var i = 0; i < 5; i++){
		dna.addSubView(addGenom(_objIndex, _dnaIndex, i));
	}
	return dna;
}

// called by function makeObj()
function makeDragObj (_objIndex) {
	var dragObject = new View({
		// origin: '50% 50',
		width: 236,
		height: 236,
		x: 74,
		y: 512
	});

	var objImage = new ImageView({
		width: 236,
		height: 236,
		x: 0,
		y: 0,
		image: '../assets/db/images/' + db.objects[_objIndex].images[0]
	});
	objImage.addClass('objImage');
	dragObject.addSubView(objImage);

	var colorLayer = new View({
		width: 236,
		height: 236,
		x: 0,
		y: 0,
		style:{
			opacity: 0
		}
	});
	colorLayer.addClass('colorLayer');
	dragObject.addSubView(colorLayer);

	dragObject.originalFrame = dragObject.frame;
	dragObject.originalFrame.y = 140;
	dragObject.addClass('dragObject');

	dragObject.dragger = new ui.Draggable(dragObject);
	
	dragObject.on(Events.DragMove, function () {
		// limit to one axis
		// console.log(dragObject.x + ' / ' + dragObject.y);
			globalDirection = getDirection(dragObject);
			animateWords(dragObject, globalDirection);
	});
	
	dragObject.dragger.on(Events.DragEnd, function () {
		if (globalDirection[1] === 'up' && globalDistance >= 70 && globalDistance <= 110){
			showInfo();
			dragObjReset(dragObject);
		}
		else if (globalDistance >= maxDistance - triggerOffset ) {
			dragObjDisappears(dragObject);
		}
		else{
			dragObjReset(dragObject);
		}
	});

	return dragObject;
}

// called by function makeObj()
function makeInfo (_objIndex) {
	var infoFrame = new View({
		width: 384,
		height: 1000,
		x: 0,
		y: 520
	});


	var currInfo = new View({
		width: 384,
		height: 1000,
		x: 0,
		y: 0
	});

	var backAction = new View({
		width: 384,
		height: 50,
		x: 0,
		y: 20,
		html: 'zurück'
	});
	backAction.addClass('action');
	currInfo.addSubView(backAction);

		var infoButtonsRow = new View({
		width: 384,
		height: infoGuiSize[1],
		x: 0,
		y: 214
	});
	infoButtonsRow.addClass('infoButtonsRow');
	currInfo.addSubView(infoButtonsRow);

	var infoButton = new View({
		width: infoGuiSize[0],
		height: infoGuiSize[1],
		x: 18,
		y: 0,
		html: 'Info'
	});

	infoButton.on('click',function () {
		infoButton.opacity = 1;
		textButton.opacity = 0.5;
		dnaButton.opacity = 0.5;
		currInfo.animate({
			properties: {
				y: 0
			},
			curve: startCurve,
			time: startTime
		});
		$('.scrollField').animate({scrollTop: 0 });
	});
	infoButton.addClass('infoButton infoGui');
	infoButtonsRow.addSubView(infoButton);

	var textButton = new View({
		width: infoGuiSize[0],
		height: infoGuiSize[1],
		x: 18 + 10 + 110,
		y: 0,
		html: 'Beschreibung',
		opacity: 0.5
	});

	textButton.on('click',function () {
		textButton.opacity = 1;
		infoButton.opacity = 0.5;
		dnaButton.opacity = 0.5;
		currInfo.animate({
			properties: {
				y: -200
			},
			curve: startCurve,
			time: startTime
		});
		$('.scrollField').animate({scrollTop: 195 });
	});
	textButton.addClass('textButton infoGui');
	infoButtonsRow.addSubView(textButton);

	var dnaButton = new View({
		width: infoGuiSize[0],
		height: infoGuiSize[1],
		x: 18 + 2 * (10 + 110),
		y: 0,
		html: 'DNA',
		opacity: 0.5
	});

	dnaButton.on('click',function () {
		dnaButton.opacity = 1;
		infoButton.opacity = 0.5;
		textButton.opacity = 0.5;
		// console.log('scroll');
		currInfo.animate({
			properties: {
				y: -200
			},
			curve: startCurve,
			time: startTime
		});
		$('.scrollField').animate({scrollTop: 695 });
	});
	dnaButton.addClass('dnaButton infoGui');
	infoButtonsRow.addSubView(dnaButton);


	var infoImage = new ImageView({
		width: 174,
		height: 174,
		x: 102,
		y: 60,
		image: '../assets/db/images/' + db.objects[_objIndex].images[0]
	});
	infoImage.addClass('infoImage');
	currInfo.addSubView(infoImage);

	var colorLayer = new View({
		width: 174,
		height: 174,
		x: 0,
		y: 0,
		opacity: 0
	});
	colorLayer.addClass('colorLayer');
	infoImage.addSubView(colorLayer);

	infoImage.originalFrame = infoImage.frame;
	infoImage.originalFrame.y = 20;
	// infoImage.on('click', function () {
	// 	console.log('click the object');
	// });

	infoImage.dragger = new ui.Draggable(infoImage);
	
	infoImage.on(Events.DragMove, function () {
		// limit to one axis
		// console.log(infoImage.x + ' / ' + infoImage.y);
		infoImage.x = 102;
		if(infoImage.y <= 20){
			infoImage.y = 20;
		}else if( infoImage.y >= 60){
			infoImage._subViews[0].opacity = 0.5;
			infoImage.y = 60;
		}else{
			infoImage._subViews[0].opacity = 0;
		}
		// console.log(getYDistance(infoImage));
	});
	
	infoImage.dragger.on(Events.DragEnd, function () {
		if(infoImage.y >= 60){
			hideInfo();
		}
		else{
			infoImage.animate({
				properties: {
					y: 20
				},
				curve: 'spring(200,10,10)'
			});
		}
		infoImage._subViews[0].opacity = 0;
	});


	var scrollField = new ScrollView({
		width: 386,
		height: 600,
		x: 0,
		y: 254
	});
	scrollField.addClass('scrollField');
	currInfo.addSubView(scrollField);

	// scrollField.addSubView(addKeyValueView(_objIndex, 'name', 'Name', 0));
	scrollField.addSubView(addKeyValueView(_objIndex, 'designer', 'Gestalter', 0));
	scrollField.addSubView(addKeyValueView(_objIndex, 'genus', 'Gattung', 1));
	scrollField.addSubView(addKeyValueView(_objIndex, 'format', 'Format', 2));
	scrollField.addSubView(addKeyValueView(_objIndex, 'year', 'Jahr', 3));
	scrollField.addSubView(addKeyValueView(_objIndex, 'country', 'Land', 4));

	var descriptionView = new View({
		width: 348,
		height: 400,
		x: 18,
		y: 200
	});
	descriptionView.addClass('descriptionView');
	scrollField.addSubView(descriptionView);

	descriptionView.addSubView(addInfoHeadline('Beschreibung'));
	var descriptionText = new View({
		width: 348,
		height: 400,
		x: 0,
		y: 30,
		html: db.objects[_objIndex].description
	});
	descriptionText.addClass('descriptionText');
	descriptionView.addSubView(descriptionText);
	scrollField.addSubView(descriptionView);

	var dnaView = new View({
		width: 348,
		height: 800,
		x: 18,
		y: 700
	});

	dnaView.addSubView(makeDNA(_objIndex, 0, 'Physikalische Erscheinung'));
	dnaView.addSubView(makeDNA(_objIndex, 1, 'Assoziative Wirkung'));
	dnaView.addClass('dnaView');
	scrollField.addSubView(dnaView);

	currInfo.addClass('infoView');
	infoFrame.addSubView(currInfo);
	return infoFrame;
}

// is called by function animateResult()
var makeItInvisible = function ( subView, index) {
	subView.opacity = 0;
};

// called by function makeObj()
function makeMainQuestion (_questionIndex) {
	// console.log(_questionIndex);
	var mainQuestion = new View({
		width: 384,
		height: 60,
		x: 0,
		y: -100,
		html: db.questions[_questionIndex].main
	});
	mainQuestion.addClass('mainQuestion');
	return mainQuestion;
}

function makeDragClusterObj (_questionIndex, _pairIndex, _objIndex) {
	// console.log('okay makeDragClusterObj');
	var distance;
	var dragObject = new View({
		// origin: '50% 50',
		width: 236,
		height: 236,
		x: 74,
		y: 512
	});

	var objImage = new ImageView({
		width: 236,
		height: 236,
		x: 0,
		y: 0,
		image: '../assets/db/images/' + db.objects[_objIndex].images[0]
	});
	objImage.addClass('objImage');
	dragObject.addSubView(objImage);

	var colorLayer = new View({
		width: 236,
		height: 236,
		x: 0,
		y: 0,
		style:{
			opacity: 0
		}
	});
	colorLayer.addClass('colorLayer');
	dragObject.addSubView(colorLayer);

	dragObject.originalFrame = dragObject.frame;
	dragObject.originalFrame.y = 140;
	dragObject.addClass('dragObject');

	dragObject.dragger = new ui.Draggable(dragObject);
	
	dragObject.on(Events.DragMove, function () {
		// limit to one axis
		// console.log(dragObject.x + ' / ' + dragObject.y);
		dragObject.y = dragObject.originalFrame.y;
		globalDirection = getDirection(dragObject);

		dragObject.y = dragObject.originalFrame.y;
		distance = getXDistance(dragObject);
			// tint and untint the dragObject colorLayer
		if (distance >= maxDistance - triggerOffset) {
			dragObject._subViews[1].opacity = 0.5;
		}
		 else{
			dragObject._subViews[1].opacity = 0;
		}
		if(globalDirection[1] === 'left') {
			dragObject.superView._subViews[1]._subViews[0].style.fontSize = getFontSize(distance, 0, 155, minAttrSize, maxAttrSize);
			if(distance >= maxDistance ) {
				dragObject.x = dragObject.originalFrame.x - maxDistance;
			}
		}
		else if(globalDirection[1] ==='right') {
			dragObject.superView._subViews[1]._subViews[2].style.fontSize = getFontSize(distance, 0, 155, minAttrSize, maxAttrSize);
			if(distance >= maxDistance ) {
				dragObject.x = dragObject.originalFrame.x + maxDistance;
			}
		}
	});
	
	dragObject.dragger.on(Events.DragEnd, function () {
		if (distance >= maxDistance - triggerOffset ) {
			clusterDragObjDisappears(dragObject, _questionIndex, _pairIndex, _objIndex);
		}
		else{
			dragObjReset(dragObject);
		}
	});

	return dragObject;
}

function makeClusterObj (_questionIndex, _pairIndex, _objIndex){
	// console.log(_questionIndex);
	var objName = new View({
		width: 236,
		height: 236,
		x: 74,
		y: 80,
		html: db.objects[_objIndex].name
	});
	objName.addClass('objName');
	TopBar.addSubView(objName);

	var currObj = new View({
		width: 384,
		height: 512,
		x: 0,
		y: 181
	});
	Scene.addSubView(currObj);
	currObj.bringToFront();
	// buid app
	// console.log('okay makeClusterObj');
	currObj.addSubView(makeMainQuestion(_questionIndex));
	currObj.addSubView(makeAnswers(_questionIndex, _pairIndex));
	currObj.addSubView(makeDragClusterObj(_questionIndex, _pairIndex, _objIndex));
	// animate

	animateClusterObject(currObj);
	return currObj;
}

function makeObj () {
	questionIndex = getRandomInt(0,1);
	pairIndex = getRandomInt(0,4);
	objIndex = getRandomInt(0,20);

	var objName = new View({
		width: 236,
		height: 236,
		x: 74,
		y: 80,
		html: db.objects[objIndex].name
	});
	objName.addClass('objName');
	TopBar._subViews[0].addSubView(objName);

	var currObj = new View({
		width: 384,
		height: 512,
		x: 0,
		y: 181
	});
	Scene.addSubView(currObj);
	currObj.bringToFront();
	// buid app
	currObj.addSubView(makeMainQuestion(questionIndex));
	currObj.addSubView(makeAnswers(questionIndex, pairIndex));
	currObj.addSubView(makeActions());
	currObj.addSubView(makeResults(objIndex, questionIndex, pairIndex));
	currObj.addSubView(makeDragObj(objIndex));

	currObj.addSubView(makeInfo(objIndex));
	// animate

	animateObject(currObj);
	return currObj;
}

// called by function makeObj()
function makeResults (_objIndex, _questionIndex, _pairIndex) {
	var resultVotes = db.objects[_objIndex].dna[_questionIndex].pairs[_pairIndex];
	var resultPercent = returnPercent(resultVotes);
	var results = new View({
		width: 384,
		height: 3*resultDotSize,
		x: 0,
		y: 150
	});
	results.addClass('results');

	var resultLeft = new View({
		width: resultDotSize,
		height: resultDotSize,
		x: 47 + 0,
		y: resultDotSize,
		origin: '50% 50%',
		scale: 0,
		opacity: 0
	});
	addResultBG(resultLeft, resultVotes[0], resultPercent[0]);
	resultLeft.addClass('result big');
	results.addSubView(resultLeft);

	var resultMid = new View({
		width: resultDotSize,
		height: resultDotSize,
		x: 47 + resultDotSize + 10,
		y: resultDotSize,
		origin: '50% 50%',
		scale: 0,
		opacity: 0
	});
	addResultBG(resultMid, resultVotes[1], resultPercent[1]);
	resultMid.addClass('result small');
	results.addSubView(resultMid);

	var resultRight = new View({
		width: resultDotSize,
		height: resultDotSize,
		x: 47 + 2*(resultDotSize + 10),
		y: resultDotSize,
		origin: '50% 50%',
		scale: 0,
		opacity: 0
	});
	addResultBG(resultRight, resultVotes[2], resultPercent[2]);
	resultRight.addClass('result big');
	results.addSubView(resultRight);

	return results;
}

// is called by function animateResult()
var makeResultVisible = function ( _subView, index) {
	var _tempScale = 1;
	if(index === 0) {
		_subView.addClass('activeResult');
	}
	if(index === 1) {
		_tempScale = 0.75;
	}
	utils.delay(100 * index, function () {
		_subView.scale = 0.1;
		_subView.animate({
				properties: {
					scale: _tempScale,
					opacity: 1
				},
				curve: globalAnimationCurve
			});
	});
};

// is called by function animateResult()
var makeResultInVisible = function ( _subView, index) {
	utils.delay(100 * index, function () {
		// _subView.scale = 1;
		_subView.animate({
				properties: {
					scale: 0,
					opacity: 0
				},
				curve: globalAnimationCurve
			});
	});
};


function nextObj () {
	clearScene();
	utils.delay(200, function () {
		makeObj();
	});
}



function showInfo(){
	changeHeadline();
	Scene._subViews[1]._subViews[5].animate({
		properties: {
			y: 0
		},
		curve: startCurve,
		time: startTime + 150
	});
	Scene._subViews[1]._subViews[5]._subViews[0]._subViews[2].animate({
		properties: {
			y:20
		},
		curve: 'spring(200,10,10)'
	});
}

function hideInfo(){
	Scene._subViews[1]._subViews[5].animate({
		properties: {
			y: 600
		},
		curve: startCurve,
		time: startTime + 150
	});
	changeHeadlineBack();
}

function clearScene () {
	Scene._subViews[1]._subViews[0].animate({
		properties:{
			y: -100,
			opacity: 0
		},
		time: 200,
		curve: 'ease-in-out'
	});
	Scene._subViews[1]._subViews[1].animate({
		properties:{
			y: 150,
			opacity: 0
		},
		time: 200,
		curve: 'ease-in-out'
	});
	Scene._subViews[1]._subViews[2].animate({
		properties:{
			scale: 0,
			opacity: 0
		},
		time: 200,
		curve: 'ease-in-out'
	});
	utils.delay(100, function () {
		Scene._subViews.pop().destroy();
	});
}

$(document).ready(function () {
	makeMenu();
	makeMenuBtn();
	designObject = makeObj();
});