import $ from 'jquery'
import 'slick-carousel'
import noUiSlider from 'nouislider'
import 'jquery.formstyler-modern'

$(function(){
	// MAIN PAGE SLIDER START
	if ($('.main__slider--js').length) {
		$('.main__slider--js').slick({
			rows: false,
			autoplay: true
		})
	}
	// MAIN PAGE SLIDER END

	// VIEWED BLOCK SLIDER START
	if ($('.viewed__slider').length) {
		$('.viewed__slider').slick({
			rows: false,
			autoplay: false
		})
	}
	// VIEWED BLOCK SLIDER END

	// SIMILAR PRODUCTS SLIDER START
	if ($('.similar-products__slider').length) {
		$('.similar-products__slider').slick({
			slidesToShow: 4,
			slideToScroll: 1,
			rows: false,
			centerPadding: '40px',
			autoplay: false
		})
	}
	// SIMILAR PRODUCTS SLIDER END

	// FORMSTYLER START
	if ( $('.select-wrap select').length ) {
		$('.select-wrap select').styler({
			locale: 'ru'
		})
	}
	// FORMSTYLER END
	

	// FILTER SLIDER START
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
	// FILTER SLIDER END
});

// FILTER START
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
// FILTER END

// ACCORDION BLOCK START
$(document).on('click', '.category1__product .group .main', function(){
	$(this).toggleClass('active');
	$(this).next().slideToggle();
});
// ACCORDION BLOCK END


// PRODUCT PAGE POPUP START
$(document).on('keydown', function (event) {
    if (event.which == 27) {
        hideProductPopup();
    }
});
// $(document).click( function(event){
// 	if( $(event.target).closest('.product_popup-wrap').length || $(event.target).closest('.category1 .group .item .image').length || $(event.target).closest('.category1 .group .item .size').length ) 
// 	return;
// 	hideProductPopup();
// 	event.stopPropagation();
// });
$(document).on('click', '.product_popup-close' , hideProductPopup);
$(document).on('click', '.category1 .group .item .image, .category1 .group .item .size' , showProductPopup);

function showProductPopup(){
	$('.popup1').addClass('active');
	$('html').addClass('overflowHidden');
};
function hideProductPopup(){
	$('.product_popup:last').removeClass('active');
	$('html').removeClass('overflowHidden');
};
// PRODUCT PAGE POPUP END