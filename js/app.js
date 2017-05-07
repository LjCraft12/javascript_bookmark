// Listen for form submit
document.getElementById('myForm').addEventListener('submit', saveBookmark);

// Save bookmark
function saveBookmark(e) {
    // Get form values
    var siteName = document.getElementById('siteName').value;
    var siteUrl  = document.getElementById('siteUrl').value;

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

    // Prevent form submission
    e.preventDefault();
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
                                        ' <h3>' + name +
                                        ' <a class="btn btn-default" target="_blank" href="'+ url +'">Visit</a>'
                                        ' </h3>' +
                                        ' </div>';
    }
}