// Listen for form submit
document.getElementById('myForm').addEventListener('submit', saveBookmark);

// Save bookmark
function saveBookmark(e) {
    // Get form values
    var siteName = document.getElementById('siteName').value;
    var siteUrl  = document.getElementById('siteUrl').value;

    if(!validateForm(siteName, siteUrl)) {
        return false;
    }

    // Create bookmark object
    var bookmark ={
        name: siteName,
        url:  siteUrl
    };


    // Local storage test
/*
    localStorage.setItem('test', 'Hello world');
    console.log(localStorage.getItem('test'));
    localStorage.removeItem('test')
    console.log(localStorage.getItem('test'));
*/

    // Test if bookmark is null
    if(localStorage.getItem('bookmarks') === null) {

        // Initialize bookmark
        var bookmarks = [];

        // Add to the array
        bookmarks.push(bookmark);

        // Set to local storage
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    } else {
        // Get bookmarks from localStorage
        var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

        // Add new bookmark to array
        bookmarks.push(bookmark);
        // Reset new bookmark object back to local storage
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    }

    // Clear form
    document.getElementById('myForm').reset();

    // Reload bookmarks
    fetchBookmarks();


    // Prevent form submission
    e.preventDefault();
}
// Delete bookmark
function deleteBookmark(url) {
    // Get bookmarks from local storage
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    // Loop through bookmarks
    for (var i = 0; i < bookmarks.length; i++) {
        if (bookmarks[i].url == url) {
            // Remove from array
            bookmarks.splice(i, 1);
        }
    }
    // Reset new bookmark object back to local storage
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

    // Reload bookmarks
    fetchBookmarks();
}

// Fetch bookmarks. Called from the body tag in html ( onload="fetchBookmarks(); )
function fetchBookmarks() {

    // Get bookmarks from localStorage
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

    // Get output Id
    var bookmarksResults = document.getElementById('bookmarksResults');

    // Build output
    bookmarksResults.innerHTML = '';

    // Loop through the array
    for(var i = 0; i < bookmarks.length; i++) {
        var name = bookmarks[i].name;
        var url  = bookmarks[i].url;

        bookmarksResults.innerHTML += '<div class="well">' +
                                      '<h3>' +name+
                                      ' <a class="btn btn-default" target="_blank" href="'+url+'">Visit</a>' +
                                      ' <a onclick="deleteBookmark(\''+url+'\')" class="btn btn-danger" href="#">Delete</a>' +
                                      '</h3>'+
                                      '</div>';
    }
}

function validateForm(siteName, siteUrl) {
    if(!siteName || !siteUrl) {
        alert('Please fill in the form');
        return false
    }

    var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
    var regex = new RegExp(expression);

    if(!siteUrl.match(regex)) {
        alert('Please use a vailid Url')
        return false
    }
    return true
}