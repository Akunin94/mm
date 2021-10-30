import $ from 'jquery'
import 'slick-carousel'
import noUiSlider from 'nouislider'
import 'jquery.formstyler-modern'
import lightGallery from 'lightgallery';

$(function(){
	// POPUP PRODUCT GALLERY START
	lightGallery(document.getElementById('popup-gallery'), {
        speed: 500,
		counter: false,
		selector: 'img'
    });
	// POPUP PRODUCT GALLERY START

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
			autoplay: false,
			responsive: [
				{
					breakpoint: 901,
					settings: {
						slidesToShow: 3
					}
				},
				{
					breakpoint: 701,
					settings: {
						slidesToShow: 2
					}
				},
				{
					breakpoint: 421,
					settings: {
						slidesToShow: 1
					}
				}
			]
		})
	}
	// SIMILAR PRODUCTS SLIDER END

	// COMPARE SLIDER START
	if ( $('.compare-page__slider').length ) {
		compareSliderInit();
		
		$(document).on('click', '.compare-page__remove', function(){
			// delete this product from compare
			document.location.reload();
		});
		$(window).on('resize orientationchange', function(){
			setTimeout(function(){
				compareSliderInit();
			}, 0);
		});
	}
	function compareSliderInit() {
		$('.compare-page__slider').each(function(){
			var $this = $(this),
				sliderItemsLength = $this.find('.compare-page__item:not(.slick-cloned)').length,
				items = 1;
			
			if ( $('body').width() > 960  ) {
				items = 3;
			} else if( $('body').width() > 560 && $('body').width() <= 960 ) {
				items = 2;
			} else {
				items = 1;
			}
			
			if ($this.hasClass('slick-slider')) {
				$this.slick('unslick');
				$this.removeClass('slick-slider')
				$this.find('.slick-cloned').remove();
			}
			
			if ( sliderItemsLength > items ) {
				$this.slick({
					slidesToShow: items,
					slideToScroll: 1,
					rows: false,
					autoplay: false
				});
			}
		});
	}
	// COMPARE SLIDER END

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
			console.log(1)
		})

		inputMin.on('input', function(){
			slider.noUiSlider.set([$(this).val(), null])
			console.log(2)
		});
		inputMax.on('input', function(){
			slider.noUiSlider.set([null, $(this).val()])
		});
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
$(document).on('click', '.open-filter', function(){
	$('.category__filters').toggleClass('active');
});
$(document).on('click', function (event) {
    if ($(event.target).closest('.category__filters').length || $(event.target).closest('.open-filter').length) return;
    $('.category__filters').removeClass('active');
    event.stopPropagation();
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
    if (event.which == 27 && !$('.lg-container.lg-show').length ) {
        hideProductPopup();
    }
});
$(document).on('click', function (event) {
	if ( $('.product_popup.active').length ) {
		if ($(event.target).closest('.product_popup-body').length || $(event.target).closest('.category1 .group .item .image').length || $(event.target).closest('.category1 .group .item .size').length || $(event.target).closest('.product-view .button a').length || $(event.target).closest('.category1 .group .item .buy-button').length || $(event.target).closest('.header__cart').length || $(event.target).closest('.product_popup .product-view .buy-button').length || $(event.target).closest('.product_popup-close').length) return;
		hideProductPopup();
		event.stopPropagation();
	}
});
$(document).on('click', '.product_popup-close' , hideProductPopup);
$(document).on('click', '.category1 .group .item .image, .category1 .group .item .size' , showProductPopup);
$(document).on('click', '.product-view .button a' , function(){
	showProductPopup1();

	return false
});
$(document).on('click', '.category1 .group .item .buy-button, .product_popup .product-view .buy-button' , function(){
	showProductPopup2();

	return false
});
$(document).on('click', '.header__cart' , function(){
	showProductPopup3();

	return false
});

function showProductPopup(){
	$('.popup1').addClass('active');
	$('body').addClass('overflowHidden');
};
function showProductPopup1(){
	$('.popup2').addClass('active');
	$('body').addClass('overflowHidden');
};
function showProductPopup2(){
	$('.popup3').addClass('active');
	$('body').addClass('overflowHidden');
};
function showProductPopup3(){
	$('.popup4').addClass('active');
	$('body').addClass('overflowHidden');
};
function hideProductPopup(){
	$('.product_popup.active:last').removeClass('active');
	$('body').removeClass('overflowHidden');
};
// PRODUCT PAGE POPUP END


// SEARCH PAGE START
$(document).on('change paste keyup', '.search-page__search input', function(){
	let $this = $(this),
		$form = $this.closest('form'),
		text = $this.val();
	
	if (text) {
		$form.addClass('active');
	} else {
		$form.removeClass('active');
	}
});
$(document).on('click', '.search-page__search button:reset', function(){
	let $this = $(this),
		$form = $this.closest('form');
		
	$form.removeClass('active');
});
// SEARCH PAGE END


// HEADER MOBILE MENU START
$(document).on('click', '.header__menu-toggle', function(){
	$(this).toggleClass('active');
});
$(function(){
	let categories = $('.header__categories').html()
	let menu = $('.header__menu').html()
	
	$('.header__menu-mobile').append(categories)
	$('.header__menu-mobile').append(menu)
});
// HEADER MOBILE MENU END