$(document).ready(function() {
	$('.asset-container.catalog.asset-full .info .clearfix').remove();
	let getpage = $(".rc-pagination.pagination").find('.rc-pagination-item').last().attr('class').split('-')[5];
	for(let j = 1; j < getpage; j++) {
		$.get('https://www.unrealengine.com/marketplace/en-US/free?count=20&sortBy=effectiveDate&sortDir=DESC&start='+j*20, function(result) {
			result = $(result);
			let asset = result.find('.asset-list-group .clearfix').children();
			console.log(asset);
			$(".asset-list-group .clearfix").append(asset);
			$('.asset-container.catalog.asset-full .info .clearfix').remove();
			
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
});
