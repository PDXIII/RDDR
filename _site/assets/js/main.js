function init(){
	if ($('title').html() === 'Glossar'){
		audiojs.events.ready(function() {
	    var as = audiojs.createAll();
  	});
	}
}

onload=function (){
  init();
}

onresize=function (){
  init();
}
