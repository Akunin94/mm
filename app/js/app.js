import $ from 'jquery'
import 'slick-carousel'
import noUiSlider from 'nouislider'
import 'jquery.formstyler-modern'

$(function(){
	if ($('.main__slider--js').length) {
		$('.main__slider--js').slick({
			rows: false,
			autoplay: true
		})
	}
	if ($('.viewed__slider').length) {
		$('.viewed__slider').slick({
			rows: false,
			autoplay: false
		})
	}

	if ( $('.select-wrap select').length ) {
		$('.select-wrap select').styler({
			locale: 'ru'
		})
	}
	
	$('.filter-slider').each(function(){
		let $this = $(this),
			slider = $this.get(0),
			inputMin = $this.next().find('.min'),
			inputMax = $this.next().find('.max'),
			min = $this.data('min'),
			max = $this.data('max'),
			step = $this.data('step');

		noUiSlider.create(slider, {
			start: [min, max/2],
			connect: true,
			step,
			range: {
				'min': min,
				'max': max
			}
		});

		slider.noUiSlider.on('update', function(values){
			inputMin.val(+values[0]);
			inputMax.val(+values[1])
		})
	});
});

$(document).on('click', '.category__filters .title', function(){
	$(this).toggleClass('active');
	$(this).next().slideToggle();
});
$(document).on('click', '.filter-button', function(){
	$(this).toggleClass('active');
});
$(document).on('click', '.filter-color-button', function(){
	$(this).toggleClass('active');
});
$(document).on('click', '.langs > span:not(.active)', function(){
	let ind = $(this).index();

	$(this).siblings().removeClass('active');
	$(this).addClass('active');

	$(this).parent().next().find('.langs-body--item').removeClass('active');
	$(this).parent().next().find('.langs-body--item').eq(ind).addClass('active');
});