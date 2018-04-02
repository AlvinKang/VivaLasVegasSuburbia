$(function () {
  $('[data-toggle="tooltip"]').tooltip();
});

$(function() {
  $('#btn-open').on('click', function() {
  	$('.sidebar').toggleClass('display-none');
  	$('#btn-open').toggleClass('display-none');
  	$('#map-container').toggleClass('col-9');
  });
  $('#btn-close').on('click', function() {
  	$('.sidebar').toggleClass('display-none');
  	$('#btn-open').toggleClass('display-none');
  	$('#map-container').toggleClass('col-9');
  });
});