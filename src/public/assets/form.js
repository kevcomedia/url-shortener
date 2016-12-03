/* global $ */
$('#url-form').on('submit', function(e) {
  e.preventDefault();
  var $shortenedUrl = $('.shortened-url');
  $shortenedUrl.html(`<p>Loading...</p>`);

  var url = $('#url').val();
  $.getJSON(`/new/${url}`, function(data) {
    $shortenedUrl.html(`<p>${data.original}</p><p><a href="${data.shortened}" target="_blank">${data.shortened}</a></p>`);
  });
});
