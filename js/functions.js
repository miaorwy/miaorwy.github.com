
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

function mouseFollow() {
    yourLogo='源码素材网';
    logoFont='Arial';
    logoSize=9;
    logoColor='red';
    logoWidth=40;
    logoHeight=40;
    logoSpeed=0.03;
    yourLogo=yourLogo.split('');
    L=yourLogo.length; 
    Result="<font face="+logoFont+" style='font-size:"+logoSize+"pt' color="+logoColor+">";
    TrigSplit=360/L;
    br=(document.layers)?1:0;
    if (br){
    for (i=0; i < L; i++)
    document.write('<layer name="ns'+i+'" top=0 left=0 width=14 height=14">'+Result+yourLogo[i]+'</font></layer>');
    }
    else{
    document.write('<div id="outer" style="position:absolute;top:0px;left:0px"><div style="position:relative">');
    for (i=0; i < L; i++)
    document.write('<div id="ie" style="position:absolute;top:0px;left:0px;width:14px;height:14px">'+Result+yourLogo[i]+'</font></div>');
    document.write('</div></div>');
    }
    ypos=0;
    xpos=0;
    step=logoSpeed;
    currStep=0;
    Y=new Array();
    X=new Array();
    Yn=new Array();
    Xn=new Array();
    for (i=0; i < L; i++) 
     {
     Yn[i]=0;
     Xn[i]=0;
     }
    (document.layers)?$window.captureEvents(Event.MOUSEMOVE):0;
    function Mouse(evnt){
     ypos = (document.layers)?evnt.pageY:event.y;
     xpos = (document.layers)?evnt.pageX:event.x;
    }
    (document.layers)?$window.onMouseMove=Mouse:document.onmousemove=Mouse;
    function animateLogo(){
    if (!br)outer.style.pixelTop=document.body.scrollTop; 
    for (i=0; i < L; i++){
    var layer=(document.layers)?document.layers['ns'+i]:ie[i].style;
    layer.top =Y[i]+logoHeight*Math.sin(currStep+i*TrigSplit*Math.PI/180);
    layer.left=X[i]+logoWidth*Math.cos(currStep+i*TrigSplit*Math.PI/180);
    }
    currStep-=step;
    }
    function Delay(){
    for (i=L; i >= 0; i--)
    {
    Y[i]=Yn[i]+=(ypos-Yn[i])*(0.1+i/L);           
    X[i]=Xn[i]+=(xpos-Xn[i])*(0.1+i/L);        
    }
    animateLogo();
    setTimeout('Delay()',20);
    }
}