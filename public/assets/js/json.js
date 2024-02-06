$.urlParam = function (name) {
    var results = new RegExp('[\?&]' + name + '=([^&#]*)')
                      .exec(window.location.search);

    return (results !== null) ? results[1] || 0 : false;
}

$(document).ready(function() {
    $('#loadedUrl').html(decodeURI($.urlParam('url')));
    $.getJSON($.urlParam('url'), function(data) {
        $('#loadedUrl').html(decodeURI($.urlParam('url'));
        $('#json-renderer').jsonViewer(data);
    })    

})