$(document).ready(function(){
	console.log(navigator.language);
	let lang = navigator.language == 'ru-RU' ? 'ru' : 'en', countItems = $('.asset-container.catalog.asset-full');
	const dict = {
		en: {
			lang: `en`,
			info_activated: `Info: The Owner Remover plugin has been activated`,
			info_add_cart: `Info: The Owner Remover plugin has added ${countItems.length} Items to cart`,
			warn_sign: `The Owner Remover plugin Error: Please Sign In`,
			plugin_btn_cart: `Add All Items to Cart`,
		},
		ru: {
			lang: `ru`,
			info_activated: `Информация: Плагин Owner Remover был активирован`,
			info_add_cart: `Информация: Плагин Owner Remover добавил ${countItems.length} продуктов в корзину`,
			warn_sign: `Ошибка плагина Owner Remover: Пожалуйста, войдите в систему`,
			plugin_btn_cart: `Добавить все продукты в корзину`,
		}
	}, translator = dict[lang];

	function owner_remover() {
		console.log(`%c${translator.info_activated}`, "color: #bada55");
		if($('.asset-container.catalog.asset-full .btn').length === 0) {
			console.log(`%c${translator.warn_sign}`, "color: #dca100");
			return
		} else {
			$('.page-header-container .page-title').append(`<div class="btn">${translator.plugin_btn_cart}</div>`);
			$('.page-header-container .page-title .btn').on("click", function() {
				for(let i = 0; i < countItems.length; i++) {
					setTimeout(() => {
						if(countItems.eq(i).find('span.btn i').hasClass('add')) {
							countItems.eq(i).find('span.btn').click();
						}
					}, 200)
				}
				console.log(`%c${translator.info_add_cart}`, "color: #bada55");
			});

			function getLastPage() {
				let page = $(".rc-pagination.pagination").find('.rc-pagination-item').last().attr('class').split('-')[5];
				console.log(`%cOwner Remover Info: ${page}`, "color: #bada55");
				return page;
			}

			function getCookie(name) {
				let matches = document.cookie.match(new RegExp(
				  "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
				));
				return matches ? decodeURIComponent(matches[1]) : undefined;
			}

			function add_to_cart(offerId) {
				return $.ajax({
					url: 'https://www.unrealengine.com/marketplace/api/shoppingCart',
					method: 'POST',
					headers: {
						'accept': 'application/json, text/plain, */*',
						'content-type': 'application/json;charset=UTF-8',
						'x-xsrf-token': getCookie('XSRF-TOKEN')
					},
					data: '{"offerId":'+offerId+'}',
					success: function(data) {
						$('.results').html(data);
					}
				});
			}
			//добавляем в корзину бэкенд
			console.log(add_to_cart('345345435'));

			//функционал убрания лишних карточек со страницы
			// $('.asset-container.catalog.asset-full .info .clearfix').remove();
			for(let j = 1; j <= 2; j++) {

				//рабочий урл на гет запрос, хедеры не нужны. для получения инфы о карточках
				$.get('https://www.unrealengine.com/marketplace/en-US/free?count=20&sortBy=effectiveDate&sortDir=DESC&start='+j * 20, function(result) {
					result = $(result);
					let asset = result.find('.asset-list-group').children();
					console.log(asset.last());
					$(".asset-list-group").append(asset);
					
					console.log( 'detach' );
					let v = $(".asset-container.catalog.asset-full");
					for(let i = 0; i < v.length; i++) {
						if(v.eq(i).children().hasClass('asset--owned')) {
							v.eq(i).remove();
						}
					}
				});
			}
			
			$('.rc-pagination').html('<li style="width: 350px;">Pagination disabled to avoid problems</li>');
		}
	}
	owner_remover();
});