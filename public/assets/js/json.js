$.urlParam = function (name) {
    var results = new RegExp('[\?&]' + name + '=([^&#]*)')
                      .exec(window.location.search);

    return (results !== null) ? results[1] || 0 : false;
}

$(document).ready(function() {

    const loadJSON = function() {
        $.getJSON($.urlParam('url'), function(data) {
            $('#loadedUrl').html(decodeURI($.urlParam('url')));
            $('#json-renderer').jsonViewer(data);
        }) 
    }
    $('#loadedUrl').html(decodeURI($.urlParam('url')));
      
    if($.urlParam('md')) {
        $.get($.urlParam('md')+".md", function(data) {
            $('#markdown-renderer').html(marked.parse(data));
        })
    }

    $('#reloadPreview').click(function() {
        loadJSON();
    })
    loadJSON();
})