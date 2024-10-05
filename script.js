const body = document.querySelector('body');
const form = document.querySelector('form');
const inputTitle = document.querySelector('#title');
const inputAuthor = document.querySelector('#author');
const inputPages = document.querySelector('#pages');
const inputstatus = document.querySelector('#status');
const inputCurrPage = document.querySelector('#current-page');
const inputPubDate = document.querySelector('#publish-date');
const booksDisplay = document.querySelector('.books-display');
const deleteIconSVG = '<svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#e8eaed"><path d="M312-144q-29.7 0-50.85-21.15Q240-186.3 240-216v-480h-48v-72h192v-48h192v48h192v72h-48v479.57Q720-186 698.85-165T648-144H312Zm336-552H312v480h336v-480ZM384-288h72v-336h-72v336Zm120 0h72v-336h-72v336ZM312-696v480-480Z"/></svg>';

let myLibrary = [];

function Book(title, author, pages, status, currentPage, publishDate) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.status = status;
    this.currentPage = currentPage;
    this.publishDate = publishDate;
}

function addBookToLibrary() {
    const bookToAdd = new Book(inputTitle.value, inputAuthor.value, inputPages.value, inputstatus.checked, inputCurrPage.value, inputPubDate.value);
    myLibrary.push(bookToAdd);
    refreshCards();
}

function createCard(item) {
    const cardWrap = document.createElement('div');
    const card = document.createElement('div');
    const title = document.createElement('h3');
    const author = document.createElement('p');
    const pages = document.createElement('span');

    cardWrap.classList.add('card-wrapper');
    card.classList.add('card');
    title.innerText = item.title;
    author.innerText = item.author;
    pages.innerText = item.pages;

    card.appendChild(title);
    card.appendChild(author);
    card.appendChild(pages);
    cardWrap.appendChild(card);
    booksDisplay.appendChild(cardWrap);
}

form.addEventListener('submit', e => {
    e.preventDefault();
    addBookToLibrary();
    console.log(myLibrary);
});

function refreshCards () {
    document.querySelectorAll('.card-wrapper').forEach(item => {item.remove()});
    
    for (item of myLibrary) {
        createCard(item);
    }
} 

// refreshCards();