// Config
Framer.config.animationPrecision = 30;
// Layer naming an position saving stuff
for (var layerGroupName in PSD) {
	window[layerGroupName] = PSD[layerGroupName];
	PSD[layerGroupName].originalFrame = window[layerGroupName].frame;
};

// variables

var menuVisible = false;

MenuButton.on('click', function () {
	var time = 250;
	var curve = 'ease-in-out';
	if(!menuVisible){
		openMenu(time, curve);
	}
	else{
		closeMenu(time, curve);
	}
});

function openMenu(_time, _curve){

	Scene.animate({
		properties: {
			x: Scene.originalFrame.x + 300
		},
		time: _time,
		curve: _curve
	});
	menuVisible = true;
}

function closeMenu(_time, _curve){

	Scene.animate({
		properties: {
			x: Scene.originalFrame.x
		},
		time: _time,
		curve: _curve
	});
	menuVisible = false;
};

MenuButton.on('click', function () {
	var time = 250;
	var curve = 'ease-in-out';
	if(!menuVisible){
		openMenu(time, curve);
	}
	else{
		closeMenu(time, curve);
	}
});

MenuButton.addClass('btn');
