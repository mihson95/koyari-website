$(window).load(function(e) {
	$('.loader').delay(250).fadeOut(500);
	$('.home-parallax').delay(750).fadeIn(500);
});

$(document).ready(function(e) {
	
	//Resize Slides
	resizeSlider();
	
	$('.home-btn').click(function(e) {
		if($(this).hasClass('active'))
		{
			var cslide = $('.home-slide.active');
			if(!$(cslide).is(':animated'))
			{
				if($(this).hasClass('top'))
				{
					var btn = $('.hnav-point').eq(0);
					btn.click();
				}
				else
				{
					var n = $('.home-slide.active').index()+1;
					var btn = $('.hnav-point').eq(n);
					btn.click();
				}
			}
		}
    });
	
	$('.home-slide').mouseup(function(e) {
        $('.home-btn').click();
    });
	
	$('.hnav-point').click(function(e) {

		if(!$(this).hasClass('active'))
		{
			$('.home-btn').removeClass('active').removeClass('top');
			var n = $('.hnav-point').index(this)+1;
			var slider = $('.home-parallax');
			var cslide = slider.find('.home-slide.active');
			var hc = slider.find('.home-slide').index(cslide)+1;
			var nslide = $('.home-slide').eq(n-1);
			if(!$(cslide).is(':animated'))
			{
				if(hc>n)
				{
					$(nslide).css({'display':'block','top':'-100%'});
					$(cslide).animate({top:'100%'},700,'easeInOutCirc');
					$(nslide).animate({top:'0'},700,'easeInOutCirc',function(){ $(this).addClass('active'); $(cslide).hide().removeClass('active'); setMovedSlide(cslide); });
				}
				else
				{
					$(nslide).css({'display':'block','top':'100%'});
					$(cslide).animate({top:'-100%'},700,'easeInOutCirc');
					$(nslide).animate({top:'0'},700,'easeInOutCirc',function(){ $(this).addClass('active'); $(cslide).hide().removeClass('active'); setMovedSlide(cslide); });
				}
				$('.hnav-point.active').removeClass('active');
				$(this).addClass('active');
				
				if(n==$('.home-slide').size())
				{
					$('.home-btn').addClass('top');
				}
 			}
		}
	
    });
	
		
	/*$('.home-slide').mousewheel(function(event) {
		if($(this).hasClass('active'))
		{
			var that = $(this);
			//console.log(event.deltaX, event.deltaY, event.deltaFactor);
			var dir = event.deltaY<0 ? 'down' : 'up';
			if(dir=='down')
			{
				if(!that.hasClass('animated'))
				{
					that.addClass('animated');
					unBlurSlide();
				}
			}
			else
			{
				if(!that.hasClass('animated'))
				{
					that.addClass('animated');
					blurSlide();
				}
			}
		}
	});*/
	
	$(document).mousewheel(function(event, delta) {
		var that = $('.home-slide.active');
		var dir;
		if(delta!=undefined)
			dir = delta<0 ? 'down' : 'up';
		else
			dir = event.deltaY<0 ? 'down' : 'up';
		if(dir=='down')
		{
			if(!that.hasClass('animated'))
			{
				that.addClass('animated');
				unBlurSlide();
			}
		}
		else
		{
			if(!that.hasClass('animated'))
			{
				that.addClass('animated');
				blurSlide();
			}
		}
	});
	
});

$(window).resize(function(e) {
	//Resize Slides
	resizeSlider();
});

function unBlurSlide()
{
	var hslide = $('.home-slide.active');
	hslide.find('.fg-normal').animate({opacity:1},500);
	hslide.find('.fg-blur').animate({opacity:0},500);
	hslide.find('.bg-blur').animate({opacity:0},500,function(){
		var htext = hslide.find('.hslide-text');
		if(htext.hasClass('right'))
		{
			htext.animate({opacity:1,left:'50%'},1000,function(){ $('.home-btn').addClass('active'); hslide.removeClass('animated'); });
		}
		else
		{
			htext.animate({opacity:1,right:'50%'},1000,function(){ $('.home-btn').addClass('active'); hslide.removeClass('animated'); });
		}
	});
}

function blurSlide()
{
	$('.home-btn').removeClass('active');
	var hslide = $('.home-slide.active');
	var htext = hslide.find('.hslide-text');
	if(htext.hasClass('right'))
	{
		htext.stop().animate({opacity:0,left:'40%'},1000);
	}
	else
	{
		htext.stop().animate({opacity:0,right:'40%'},1000);
	}
	hslide.find('.fg-normal').stop().delay(1000).animate({opacity:0},500);
	hslide.find('.fg-blur').stop().delay(1000).animate({opacity:1},500);
	hslide.find('.bg-blur').stop().delay(1000).animate({opacity:1},500, function(){ hslide.removeClass('animated');});
}

function setMovedSlide(hslide)
{
	var htext = hslide.find('.hslide-text');
	if(htext.hasClass('right'))
		htext.css({opacity:0,left:'40%'});
	else
		htext.css({opacity:0,right:'40%'});
	hslide.find('.fg-normal').css({opacity:0});
	hslide.find('.fg-blur').css({opacity:1});
	hslide.find('.bg-blur').css({opacity:1});
	
}

//Resize Slides when Window is Resized
function resizeSlider()
{
	var winW = $(window).width();
	var winH = $(window).height();
	var aspImg = 0.66640625;
	var aspWin = winH/winW;
	var ih,iw,il,it;
	if(aspImg<aspWin)
	{
		ih = winH;
		iw = winH/0.66640625;
		il = -((iw-winW)/2);
		it = 0;
		$('.hslide-layer').css({'width':iw+'px','height':ih+'px','left':il+'px','top':it+'px'});
	}
	else
	{
		iw = winW;
		ih = winW*0.66640625;
		il = 0;
		it = -((ih-winH)/2);
		$('.hslide-layer').css({'width':iw+'px','height':ih+'px','left':il+'px','top':it+'px'});
	}
}

