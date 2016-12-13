function ProductClient() {
  var pageIndex = 1;
  var keyword = $('#amazon-grid').attr('data-page-keyword');
  var working = false;
  var that = this;

  function url() {
    return String('/search/' + keyword + '?page=' + pageIndex);
  }
  that.more = function() {
      _.defer(function() {
      if (working) return;
      working = true;
      pageIndex = pageIndex + 1;
      $.get(url(), function(productsHtml) {
        $('#product-container').append(productsHtml);
        working = false;
      });
    });
  };
}


$( window ).load(function() {
  // create New product client
  var products = new ProductClient();

  function distanceFromBottom() {
    var contentOffset = $('#product-container').offset().top * -1;
    var documentHeight = $(document).height();
    var contentHeight = $('#product-container').height();
    return contentHeight - Math.max(0, contentOffset) - documentHeight;
  }

  // load more items if screen is already at the bottom
  if($(document).height() > $('#product-container').height()) {
    products.more();
  }

  $('main.mdl-layout__content').scroll(function() {
    if(distanceFromBottom()  <  250) {
      products.more();
    }
  });
});


$('.demo-blog__posts.mdl-grid').on('click','.mdl-card.mdl-cell .mdl-card__media', function() {
  var $el = $(this).parent();
  var formattedPrice = $el.find('.price-tag').text() || '';
  var imageSet = [];
  var image = $el.find('.mdl-card__media').css('background-image') || '';
  var link = $el.find('a').attr('href') || '';
  var description = $el.find('.product-desctrition').attr('data-description') || '';
  console.log(image);
  var name = $el.find('strong').text();
  $('.product-details-container .product-title').text(name);
  $('.product-details-container .product-price').text(formattedPrice);
  $('.product-image-slider').css('background-image', image);
  $('.product-detail-desctrition').html(description);
  $('.product-buy-link').attr('href', link);
  $('.product-container').toggle();
});

$('.product-details-lightbox').on('click', function() {
  console.log('lightbox clicked');
  $('.product-container').toggle();
});
