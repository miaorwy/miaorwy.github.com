
var $window = $(window), gardenCtx, gardenCanvas, $garden, garden;
var clientWidth = $(window).width();
var clientHeight = $(window).height();

$(function () {
    // setup garden
	$loveHeart = $("#loveHeart");
	var offsetX = $loveHeart.width() / 2;
	var offsetY = $loveHeart.height() / 2 - 55;
    $garden = $("#garden");
    gardenCanvas = $garden[0];
	gardenCanvas.width = $("#loveHeart").width();
    gardenCanvas.height = $("#loveHeart").height()
    gardenCtx = gardenCanvas.getContext("2d");
    gardenCtx.globalCompositeOperation = "lighter";
    garden = new Garden(gardenCtx, gardenCanvas);
	
	$("#content").css("width", $loveHeart.width() + $("#code").width());
	$("#content").css("height", Math.max($loveHeart.height(), $("#code").height()));
	$("#content").css("margin-top", Math.max(($window.height() - $("#content").height()) / 2, 10));
	$("#content").css("margin-left", Math.max(($window.width() - $("#content").width()) / 2, 10));

    // renderLoop
    setInterval(function () {
        garden.render();
    }, Garden.options.growSpeed);
});

$(window).resize(function() {
    var newWidth = $(window).width();
    var newHeight = $(window).height();
    if (newWidth != clientWidth && newHeight != clientHeight) {
        location.replace(location);
    }
});

function getHeartPoint(angle) {
	var t = angle / Math.PI;
	var x = 19.5 * (16 * Math.pow(Math.sin(t), 3));
	var y = - 20 * (13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
	return new Array(offsetX + x, offsetY + y);
}

function startHeartAnimation() {
	var interval = 50;
	var angle = 10;
	var heart = new Array();
	var animationTimer = setInterval(function () {
		var bloom = getHeartPoint(angle);
		var draw = true;
		for (var i = 0; i < heart.length; i++) {
			var p = heart[i];
			var distance = Math.sqrt(Math.pow(p[0] - bloom[0], 2) + Math.pow(p[1] - bloom[1], 2));
			if (distance < Garden.options.bloomRadius.max * 1.3) {
				draw = false;
				break;
			}
		}
		if (draw) {
			heart.push(bloom);
			garden.createRandomBloom(bloom[0], bloom[1]);
		}
		if (angle >= 30) {
			clearInterval(animationTimer);
			showMessages();
		} else {
			angle += 0.2;
		}
	}, interval);
}

(function($) {
	$.fn.typewriter = function() {
		this.each(function() {
			var $ele = $(this), str = $ele.html(), progress = 0;
			$ele.html('');
			var timer = setInterval(function() {
				var current = str.substr(progress, 1);
				if (current == '<') {
					progress = str.indexOf('>', progress) + 1;
				} else if (current == '&') {
				    progress = str.indexOf(';', progress) + 1;
				} else {
				    if(current == '!') {
				        setTimeout(function () {
		                    stopType();
	                    }, 1000);
	                    setTimeout(function () {
		                    showSlide();
	                    }, 3000);
				    }
					progress++;
				}
				$ele.html(str.substring(0, progress) + (progress & 1 ? '_' : ''));
				if (progress == str.length/2) {
				    startHeartAnimation();
				}
				if (progress >= str.length) {
					clearInterval(timer);
				}
			}, 75);
		});
		return this;
	};
})(jQuery);

function timeElapse(date){
	var current = Date();
	var seconds = (Date.parse(current) - Date.parse(date)) / 1000;
	var days = Math.floor(seconds / (3600 * 24));
	seconds = seconds % (3600 * 24);
	var hours = Math.floor(seconds / 3600);
	if (hours < 10) {
		hours = "0" + hours;
	}
	seconds = seconds % 3600;
	var minutes = Math.floor(seconds / 60);
	if (minutes < 10) {
		minutes = "0" + minutes;
	}
	seconds = seconds % 60;
	if (seconds < 10) {
		seconds = "0" + seconds;
	}
	var result = "<span class=\"digit\">" + days + "</span> 天 <span class=\"digit\">" + hours + "</span> 时 <span class=\"digit\">" + minutes + "</span> 分 <span class=\"digit\">" + seconds + "</span> 秒"; 
	$("#elapseClock").html(result);
}

function showMessages() {
	adjustWordsPosition();
	$('#messages').fadeIn(5000, function() {
		showLoveU();
	});
}

function adjustWordsPosition() {
	$('#words').css("position", "absolute");
	$('#words').css("top", $("#garden").position().top + 195);
	$('#words').css("left", $("#garden").position().left + 70);
}

function showLoveU() {
	$('#loveu').fadeIn(3000);
}

function showSlide() {
	$('#slide').fadeIn(3000);
}

function stopType() {
    document.getElementById('type').pause();
}

function typeSound() {
    var sound = document.getElementById('type');
    sound.volume = 0.5;
    sound.play();
    sound.addEventListener('ended', function(){
        this.currentTime = 0;
        this.play();
    }, false);
}

// Mouse follow effect

kisserCount = 10; //maximum number of images on screen at one time
curKisser = 0; //the last image DIV to be displayed (used for timer)
kissDelay = 1500; //duration images stay on screen (in milliseconds)
kissSpacer =100; //distance to move mouse b4 next heart appears
theimage = "icon/heart.png"; //the 1st image to be displayed
theimage2 = "icon/heart.png"; //the 2nd image to be displayed


// Browser checking and syntax variables
var docLayers = (document.layers) ? true:false;
var docId = (document.getElementById) ? true:false;
var docAll = (document.all) ? true:false;
var docbitK = (docLayers) ? "document.layers['":(docId) ? "document.getElementById('":(docAll) ? "document.all['":"document.";
var docbitendK = (docLayers) ? "']":(docId) ? "')":(docAll) ? "']":"";
var stylebitK = (docLayers) ? "":".style";
var showbitK = (docLayers) ? "show":"visible";
var hidebitK = (docLayers) ? "hide":"hidden";
var ns6=document.getElementById&&!document.all;

// Variables used in script
var posX, posY, lastX, lastY, kisserCount, curKisser, kissDelay, kissSpacer, theimage;
lastX = 0;
lastY = 0;

//Collection of functions to get mouse position and place the images
function doKisser(e) {
    posX = getMouseXPos(e);
    posY = getMouseYPos(e);
    if (posX>(lastX+kissSpacer)||posX<(lastX-kissSpacer)||posY>(lastY+kissSpacer)||posY<(lastY-kissSpacer)) {
        showKisser(posX,posY);
        lastX = posX;
        lastY = posY;
    }
}

// Get the horizontal position of the mouse
function getMouseXPos(e) {
    if (document.layers||ns6) {
        return parseInt(e.pageX+10);
    } else {
        return (parseInt(event.clientX+10) + parseInt(document.body.scrollLeft));
    }
}

// Get the vartical position of the mouse
function getMouseYPos(e) {
    if (document.layers||ns6) {
        return parseInt(e.pageY);
    } else {
        return (parseInt(event.clientY) + parseInt(document.body.scrollTop));
    }
}

//Place the image and start timer so that it disappears after a period of time
function showKisser(x,y) {
    var processedx=ns6? Math.min(x,window.innerWidth-75) : docAll? Math.min(x,document.body.clientWidth-55) : x;
    if (curKisser >= kisserCount) {
        curKisser = 0;
    }
    eval(docbitK + "kisser" + curKisser + docbitendK + stylebitK).left =  processedx + 'px';
    eval(docbitK + "kisser" + curKisser + docbitendK + stylebitK).top = y + 'px';
    eval(docbitK + "kisser" + curKisser + docbitendK + stylebitK + ".visibility = '" + showbitK + "'");
    if (eval("typeof(kissDelay" + curKisser + ")")=="number") {
        eval("clearTimeout(kissDelay" + curKisser + ")");
    }
    eval("kissDelay" + curKisser + " = setTimeout('hideKisser(" + curKisser + ")',kissDelay)");
    curKisser += 1;
}

//Make the image disappear
function hideKisser(knum) {
  eval(docbitK + "kisser" + knum + docbitendK + stylebitK + ".visibility = '" + hidebitK + "'");
}

function kissbegin(){
    //Let the browser know when the mouse moves
    if (docLayers) {
        document.captureEvents(Event.MOUSEMOVE);
        document.onMouseMove = doKisser;
    } else {
        document.onmousemove = doKisser;
    }
}

window.onload=kissbegin;