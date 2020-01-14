let myLibrary = [];

function Book(title, author, pages, isRead, image){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
    this.image = image;
}

//function to push the book to the array
function addBookToLibrary(book) {
    myLibrary.push(book);
}

//demo books default added
let book1 = new Book("Harry Potter", "J. K. Rowling", "368", "The book isn't read yet!", "https://images-na.ssl-images-amazon.com/images/I/51OZerWcGCL._SY346_.jpg");
let book2 = new Book("The Maze Runner", "James Dashner", "375", "The book is read!", "https://images-na.ssl-images-amazon.com/images/I/51UU0FLH1wL._SY346_.jpg");

addBookToLibrary(book1);
addBookToLibrary(book2);


/**
 * this function itterate through the array and display every element in each place
 */
function render() {
    for(let i = 0; i < myLibrary.length; i++) {
        //create a p element to hold the title value
        let titlePara = document.createElement('p');
        titlePara.setAttribute("id", "title");
        titlePara.innerHTML = "Title: " + myLibrary[i].title;

        let titleDiv = document.createElement("div");
        titleDiv.appendChild(titlePara);

        //create a p element to hold the author value
        let authorPara = document.createElement('p');
        authorPara.setAttribute("id", "author");
        authorPara.innerHTML = "Author: " + myLibrary[i].author;

        let authorDiv = document.createElement("div");
        authorDiv.appendChild(authorPara);

        //create a p element to hold the pages value
        let pagesPara = document.createElement('p');
        pagesPara.setAttribute("id", "pages");
        pagesPara.innerHTML = "Pages: " + myLibrary[i].pages;

        let pagesDiv = document.createElement("div");
        pagesDiv.appendChild(pagesPara);
        
        //create a p element to hold the status value
        let statusPara = document.createElement('p');
        statusPara.setAttribute("id", "status");
        statusPara.innerHTML = myLibrary[i].isRead;

        //set the status color to green if it's read and red if it isn't read
         if(myLibrary[i].isRead == "The book is read!"){
            statusPara.style.color = "green";
         } else if(myLibrary[i].isRead == "The book isn't read yet!"){
             statusPara.style.color = "red";
        } else return;
         
        let statusDiv = document.createElement("div");
        statusDiv.appendChild(statusPara);

        //create a div to contain the p elements
        let textDiv = document.createElement('div');
        textDiv.setAttribute("id", "text");

        textDiv.appendChild(titleDiv);
        textDiv.appendChild(authorDiv);
        textDiv.appendChild(pagesDiv);
        textDiv.appendChild(statusDiv);

        //create an img element to hold the book image
        let bookImage = document.createElement('img');
        bookImage.setAttribute('id', 'book-image')
        bookImage.src = myLibrary[i].image;

        
        //create a button to hold the delete value
        let deleteButton = document.createElement('button');
        deleteButton.innerHTML = "Delete";
        deleteButton.setAttribute("id", "delete");

        //create a button to hold the edit status value
        let editButton = document.createElement('button');
        editButton.innerHTML = "Read!";
        editButton.setAttribute("id", "edit");

        //the div that hold the 2 buttons
        let editDiv = document.createElement("div");
        editDiv.setAttribute("id", "edit-menu");

        editDiv.appendChild(deleteButton);
        editDiv.appendChild(editButton);

        //create div element to hold the img, details and the buttons
        let itemDiv = document.createElement("div");
        itemDiv.setAttribute("id", "item");

        itemDiv.appendChild(bookImage);
        itemDiv.appendChild(textDiv);
        itemDiv.appendChild(editDiv);

        //link the container HTML to add every item to it
        let container = document.getElementById("container");
        container.appendChild(itemDiv);

        //get the item index attached to every delete button so we can work on it
        deleteButton.setAttribute('data-item-index', i);
        editButton.setAttribute('data-item-index', i);

        /**
         * this method delete an item at a specific index when the user hit Delete
         */
        deleteButton.addEventListener('click', function() {
            let itemIndex = deleteButton.getAttribute('data-item-index');
            myLibrary.splice(itemIndex, 1);
            itemDiv.style.display = "none"
            console.log(myLibrary);
        })
        
        /**
         * this method change an item status from unread to read at a specific index when the user hit Read
         */
        editButton.addEventListener('click', function() {
            let itemIndex = editButton.getAttribute('data-item-index');
            if(myLibrary[itemIndex].isRead == "The book isn't read yet!"){
                myLibrary[itemIndex].isRead = "The book is read!";
            }
            statusPara.innerHTML = myLibrary[itemIndex].isRead;
            statusPara.style.color = "green"
        })
    }
}


// this function to show the form div when i clock the button
function showAddBook() {
    document.getElementById('book-title').value = ""
    document.getElementById('book-author').value = ""
    document.getElementById('book-pages').value = ""
    document.getElementById('book-image-src').value = ""
    document.getElementById('the-form').style.display = "block";
    document.getElementById('add-book').style.display = "none";
    document.getElementById('hide-book').style.display = "block";
}
// this function to hide the form div when i click the X button
function hideAddBook() {
    document.getElementById('the-form').style.display = "none"
    document.getElementById('add-book').style.display = "block";
    document.getElementById('hide-book').style.display = "none";
}



/**
 * this function takes the values from the form and create and new object
 * with the values we put in the form
 */
function addBook() {
    let newTitle = document.getElementById('book-title').value;
    let newAuthor = document.getElementById('book-author').value;
    let newPages = document.getElementById('book-pages').value;
    let newIsRead;
    let imgSource;
    //check the radio value and set the status value according to the radio value
    let check = document.querySelector('[name="readr"]:checked');
    if(check.value == 1) newIsRead = "The book is read!";
    if(check.value == 0) newIsRead = "The book isn't read yet!";
    //if the user put an image link the image appears from the link
    //if he doesn't choose to put an image it takes a default image from our gallery
    let src = document.getElementById('book-image-src').value;
    if(src == ""){
        imgSource = "images/sample.png";
    }else {
        imgSource = src;
    }
    //create a new object with the given values the user entered 
    let newBook = new Book(newTitle, newAuthor, newPages, newIsRead, imgSource);
    addBookToLibrary(newBook);
    document.getElementById('container').innerHTML = null;
    render()
    
    document.getElementById('the-form').style.display = "none";
    document.getElementById('add-book').style.display = "block";
}

//we call render here to display our demo books on the screen once the user opens the website
render()