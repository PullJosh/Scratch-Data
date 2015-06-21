(function(ext) {
    // Cleanup function when the extension is unloaded
    ext._shutdown = function() {};

    // Status reporting code
    // Use this to report missing hardware, plugin or unsupported browser
    ext._getStatus = function() {
        return {status: 2, msg: 'Ready'};
    };

    ext.projectData = function(id, itemToGet) {
        function projectData(itemToGet) {
            $.ajax({
              url: "https://scratch.mit.edu/api/v1/project/" + id + "/?format=json",
              beforeSend: function( xhr ) {
                xhr.overrideMimeType( "text/plain; charset=x-user-defined" );
              },
              success: function( data ) {
                    var jsonData = JSON.parse(data);

                    if (itemToGet == "love-its") {
                        callback(jsonData.love_count);
                    } else if (itemToGet == "favorites") {
                        return jsonData.favorite_count;
                    } else if (itemToGet == "creator") {
                        return jsonData.creator.username;
                    } else {
                        return "Something's broken. Check to make sure the project ID you entered is correct.";
                    }
                }
            });
        }
    };

    // Block and block menu descriptions
    var descriptor = {
        blocks: [
            // Block type, block name, function name
            ['R', 'get %m.projectData of %s', 'projectData', "love-its", "17864586"]
        ],
        menus: {
           projectData: ['love-its', 'favorites', 'creator']
        }
    };

    // Register the extension
    ScratchExtensions.register('Scratch Data', descriptor, ext);
})({});
