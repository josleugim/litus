$(document).ready(function() {

	//this function only for Desktop view
	isMobile = navigator.userAgent.match(/(iPhone|iPod|Android|BlackBerry|iPad|IEMobile|Opera Mini)/);
	if (isMobile) {
		$('.icon-menu, nav a').on('click',function(){
			$('.icon-menu, .icon-cross').toggleClass('icon-menu icon-cross');
			$('nav').fadeToggle(250);
		});
	}

});