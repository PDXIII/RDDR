// receivs an array of values and returns it in percent
function returnPercent (_resultValues) {
	var valSum = 0;
	var values = [];
	for (var i = 0; i < _resultValues.length; i++) {
		valSum += _resultValues[i];
	}

	for (var i = 0; i < _resultValues.length; i++) {
		values.push(100 / valSum * _resultValues[i])
	}
	// console.log(_resultValues);
	// console.log(values);
	return values
}

function returnOpacity (_percentVal) {
	// console.log( _percentVal / 100)
	return _percentVal / 100;
}

function map_range (value, low1, high1, low2, high2) {
  return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
}

function makeMenu () {
	var nav = new View ({
		x: 20,
		y: 100,
		width: 200,
		height:400,
		html: '<ul class="nav">' +
					'	<li><a class="menuLink" href=""><i class="fa fa-search fa-fw"></i>Suche</a></li>' +
					'	<li><a class="menuLink" href="../iPad-Stream/index.html"><i class="fa fa-circle fa-fw"></i>Radar</a></li>' +
					'	<li><a class="menuLink" href="../iPad-Cluster/index.html"><i class="fa fa-square fa-fw"></i>Cluster</a></li>' +
					'	<li><a class="menuLink" href=""><i class="fa fa-user fa-fw"></i>Profil</a></li>' +
					'</ul>'
	});
	MainMenu.addSubView(nav);
}

function makeMenuBtn() {
	MenuButton.on('click', function() {
		var time = 250;
		var curve = 'ease-in-out';
		if(!menuVisible) {
			openMenu(time, curve);
		}
		else{
			closeMenu(time, curve);
		}
	});
	MenuButton.addClass('btn');
}

function openMenu (_time, _curve) {
	Scene.animate({
		properties: {
			x: Scene.originalFrame.x + 150
		},
		time: _time,
		curve: _curve
	});
	menuVisible = true;
}

function closeMenu (_time, _curve) {
	Scene.animate({
		properties: {
			x: Scene.originalFrame.x
		},
		time: _time,
		curve: _curve
	});
	menuVisible = false;
}
