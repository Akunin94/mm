import $ from 'jquery'
import 'slick-carousel'

$(function(){
	if ($('.main__slider--js').length) {
		$('.main__slider--js').slick({
			rows: false,
			autoplay: true
		})
	}
});