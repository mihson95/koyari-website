if ((screen.width<960)) {
    window.location = 'http://m.farmofhappiness.com' + window.location.pathname;
} 

// JavaScript Document
var bval=0, flagswap=0, flagswap1=0, act=0,i=6;
var flag = 0 , sflag=0, nflag=0, dflag=0, tflag=0, fflag=0;

jQuery.fn.doesExist = function(){
    return jQuery(this).length > 0;
};

$(document).ready(function(e) {
	var currntpos = $(document).scrollTop();
	var sheight = $(window).height()*2.5;
	var dheight = $(window).height()*1.5;
	$('.back-img').delay(5000).css('height', sheight + 'px');
	
 	if($('#nav-bar').doesExist())
	{
		var stickyHeaderTop = $('#nav-bar').offset().top;
		var stickyHeaderTop1 = $('.title-container').offset().top;
		var stickyHeaderTop2 = $('#cal-con').offset().top;
		$(window).scroll(function(){
			var x = $(this).scrollTop();
			var bg_pos = stickyHeaderTop2 - x - 175;
			console.log(stickyHeaderTop2 +' - '+x+' = '+bg_pos);
			if( $(window).scrollTop() > stickyHeaderTop &&  $(window).scrollTop() < stickyHeaderTop1 - 38 ) {
					$('#nav-bar').addClass('sticky');
					$('#nav-bar').css('background-position', '0% ' + bg_pos + 'px');
			} else {
					$('#nav-bar').removeClass('sticky');
					$('#nav-bar').css('background-position', '0px ' + '0px');
			}
		});
	}
	 
	$(function(){
		var sidebar = $('.round-team');
		sidebar.delegate('a.inactive-team','click',function(){
			sidebar.find('.active-team').toggleClass('active-team inactive-team');
			$(this).toggleClass('active-team inactive-team');
		});
	});
	 $('.team-box a').click(function() {
		 $('.team-box').fadeOut(250);
		 $('.round-team a').removeClass('active-team');
	 });
    
	$('.menu-btn a').click(function(){
		if(flagswap==0)
		{
			$('.menu-con').animate({marginLeft:0},500);
			$('.menu-btn').animate({marginLeft:'277px'},500);
			$('.slide-left').animate({marginLeft:'252px'},500);
			$('.team-box4').css({right:'10%', top:'19%'});
			$('.arrow-b4').css('display','none');
			$('.team-box3 ').css({right:'10%', top:'59%'});
			$('.arrow-b3').css('display','none');
			$('.team-box2').css('left','72%');
			flagswap=1;
		}
		else
		{
			$('.menu-btn').animate({marginLeft:'25px'},500);
			$('.menu-con').animate({marginLeft:'-252px'},500);
			$('.slide-left').animate({marginLeft:'0px'},500);
			$('.team-box4').css({right:'-81px', top:'-2%'});
			$('.arrow-b4').css('display','block');
			$('.team-box3 ').css({right:'-85px', top:'65%'});
			$('.arrow-b3').css('display','block');
			$('.team-box2').css('left','76%');
			flagswap=0;
		}
	});
	
    $("#nav > li > a").click(function(e) {
    $(this).closest('ul').find('.active1').removeClass('active1');
        $(this).parent().addClass('active1');
    });
    
    $('.sidebar ul li a').click(function(ev) {
        $('.sidebar .sub-menu').not($(this).parents('.sub-menu')).slideUp();
        $(this).next('.sub-menu').slideToggle();
        $(this).find('.sidebar ul li').toggleClass('active');

    });

});
    
$(document).mouseup(function(e) {
	if($('.menu-con').has(e.target).length === 0 && $('.menu-btn').has(e.target).length === 0 && flagswap==1)
		$('.menu-btn a').click();
});

$(window).scroll(function(e){
    if($('.title-container').doesExist()){
        var scroll_top = getScrollTop();
        if(scroll_top>200)
            $('.title-container').addClass('filled');
        else
            $('.title-container').removeClass('filled');
    }
});

function oBottomMsg(){
	$("#bottom-message-pop").stop().animate({bottom:'0px'},800);
	setTimeout(cBottomMsg, 4000);
}

function cBottomMsg(){
	$("#bottom-message-pop").stop().animate({bottom:'-90px'},1500);
}

function getScrollTop(){ //  Verifies the total sum in pixels of the whole page
	if(typeof pageYOffset!= 'undefined'){
		// Most browsers
		return pageYOffset;
	}
	else{
		var B= document.body; //IE 'quirks'
		var D= document.documentElement; //IE with doctype
		D= (D.clientHeight)? D: B;
		return D.scrollTop;
	}
}
