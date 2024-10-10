const body = document.querySelector('body');
const form = document.querySelector('form');
const inputImage = document.querySelector('#image-url');
const inputTitle = document.querySelector('#title');
const inputAuthor = document.querySelector('#author');
const inputPages = document.querySelector('#pages');
const statusInputs = document.querySelectorAll('input[name="status"]'); 
const inputCurrPage = document.querySelector('#current-page');
const inputPubDate = document.querySelector('#publish-date');
const booksDisplay = document.querySelector('.books-display');
const resetButton = document.querySelector('#form-reset');
const errorOutput = document.querySelector('.error');

let myLibrary = [];
let booksDeleted = [];  // could be used to undo a mistake

myLibrary.push(new Book("https://i.pinimg.com/originals/60/4e/7b/604e7b5567961081bb4d41e0c6e43d71.png", "Harry Potter and The Half Blood Prince", "J.K. Rowling", "607", "reading", "109", "2005-07-16"));
myLibrary.push(new Book("https://i0.wp.com/americanwritersmuseum.org/wp-content/uploads/2018/02/CK-3.jpg?resize=267%2C400&ssl=1", "The Great Gatsby", "F. Scott Fitzgerald", "180", "not-read", "0", "1925-04-05"));
myLibrary.push(new Book("https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1409600899i/9723667.jpg", "And Then There Were None", "Agatha Christie", "272", "read", '0', '1939-11-06'));

function Book(image, title, author, pages, status, currentPage, publishDate) {
    this.image = image;
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.status = status;
    this.currentPage = currentPage;
    this.publishDate = publishDate;
}

function addBookToLibrary() {
    
    let inputStatus;
    statusInputs.forEach(i => {
        if(i.checked == true) {
            inputStatus = i.getAttribute('id');
        }
    });
    let currentPage;
    if(inputStatus != 'reading' || inputCurrPage.value == '') { 
        currentPage = 0;
    }
    else {
        currentPage = inputCurrPage.value;
    }

    // REMINDER: need to output the validation errors
    if (inputTitle.value != '' && inputAuthor.value != '' && inputPages.value != '' && parseInt(inputPages.value) > 0  && inputStatus && inputPubDate.value != '' && parseInt(inputPages.value) >= parseInt(currentPage) && parseInt(currentPage) >= 0) {
        
        const bookToAdd = new Book(inputImage.value, inputTitle.value, inputAuthor.value, inputPages.value, inputStatus, currentPage, inputPubDate.value);
        
        if (!myLibrary.some(book => book.title.toLowerCase() == bookToAdd.title.toLowerCase() && book.author.toLowerCase() == bookToAdd.author.toLowerCase())) {
            myLibrary.push(bookToAdd);
            refreshCards();
            errorOutput.innerText = '';
            resetButton.click();
        }
        else {
            errorOutput.innerText = `A book named ${bookToAdd.title} written by ${bookToAdd.author} already exists.`;
        }
    }
    else if (inputTitle.value == '' || inputAuthor.value == '' || inputPages.value == '' || !inputStatus || inputPubDate.value == '') {
        errorOutput.innerText = `Please fill all the required inputs. The required inputs are marked with an asterisk (*).`;
    }
    else if (parseInt(inputPages.value) <= 0 || currentPage < 0) {
        errorOutput.innerText = `A negative number, seriously?`
        errorOutput.innerHTML += '<br>';
        errorOutput.innerText += `A book may have a negative number of pages in an alternate univerese, but not here.`;
    }
    else if (inputStatus == 'reading' && (parseInt(inputPages.value) < parseInt(currentPage))) {
        errorOutput.innerText = `You can't read ${currentPage} pages of a book that has ${inputPages.value} pages. The title page doesn't count.`
    }
}

function createCard(item, index) {
    const cardWrap = document.createElement('div');
    cardWrap.classList.add('card-wrapper');
    cardWrap.dataset.index = index; // new concept for me. specially, HTML's attribute like [data-my-name = 'raza'] being used as [dataset.myName] in js

    const card = `
                    <div class="card">
                        <img src="" alt="" class="card-image" onerror="this.src='./images/book-cover-placeholder.png'; this.style.border = '2px solid currentColor'">
                        <div class="card-description">
                            <div class="card-status-wrapper"> 
                                    <div class="card-change-status-wrapper">
                                            <div class="card-status-options">
                                                <button class="card-status-option" id="state-not-read" data-state='not-read'><h4>Not Read Yet</h4></button>
                                                <button class="card-status-option" id="state-reading" data-state='reading'><h4>Reading</h4></button>
                                                <button class="card-status-option" id="state-read" data-state='read'><h4>Read</h4></button>
                                            </div>
                                            <input type="checkbox" class="card-change-status">
                                            <svg xmlns="http://www.w3.org/2000/svg" class="more-icon" viewBox="0 -960 960 960" fill="#e8eaed"><path d="M480-160q-33 0-56.5-23.5T400-240q0-33 23.5-56.5T480-320q33 0 56.5 23.5T560-240q0 33-23.5 56.5T480-160Zm0-240q-33 0-56.5-23.5T400-480q0-33 23.5-56.5T480-560q33 0 56.5 23.5T560-480q0 33-23.5 56.5T480-400Zm0-240q-33 0-56.5-23.5T400-720q0-33 23.5-56.5T480-800q33 0 56.5 23.5T560-720q0 33-23.5 56.5T480-640Z"/></svg>
                                    </div>
                                    <button class="card-button card-remove" id="removeCardBtn"><svg xmlns="http://www.w3.org/2000/svg" class="delete-icon" height="20px" viewBox="0 -960 960 960" width="20px" fill="#e8eaed"><path d="M312-144q-29.7 0-50.85-21.15Q240-186.3 240-216v-480h-48v-72h192v-48h192v48h192v72h-48v479.57Q720-186 698.85-165T648-144H312Zm336-552H312v480h336v-480ZM384-288h72v-336h-72v336Zm120 0h72v-336h-72v336ZM312-696v480-480Z"/></svg></button>
                            </div>
                            <h3 class="card-title"></h3>
                            <h5 class="card-author"></h5>
                            <div class="card-page-date-group">
                                <h6 class="card-pages"></h6>
                                <h6 class="card-published"></h6>
                            </div>
                            <div class="card-reading">
                                    <input type="range" class="card-reading-progress" value="0" min='0' max="">
                                    <div class="card-reading-info">
                                        <button class="card-page-change-button" id="subPageBtn">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="m464-480 140 140q18 18 18 44t-18 44q-18 18-44 18t-44-18L333-435q-9-9-14-21t-5-24q0-12 5-24t14-21l183-183q18-18 44-18t44 18q18 18 18 44t-18 44L464-480Z"/></svg>
                                        </button>
                                        <h6 class="card-reading-page">Page <span class="card-reading-number">0</span></h6>
                                        <button class="card-page-change-button" id="addPageBtn">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill=""><path d="M472-480 332-620q-18-18-18-44t18-44q18-18 44-18t44 18l183 183q9 9 14 21t5 24q0 12-5 24t-14 21L420-252q-18 18-44 18t-44-18q-18-18-18-44t18-44l140-140Z"/></svg>
                                        </button>
                                    </div>
                            </div>   
                        </div>
                    </div>
    `;
    cardWrap.innerHTML = card;
    
    cardWrap.querySelector('.card-image').setAttribute('src', item.image);
    cardWrap.querySelector('.card-title').innerText = item.title;
    cardWrap.querySelector('.card-author').innerText = item.author;
    if (parseInt(item.pages) > 1) {
        cardWrap.querySelector('.card-pages').innerText = item.pages + " Pages";
    }
    else {
        cardWrap.querySelector('.card-pages').innerText = item.pages + " Page";
    }
    cardWrap.querySelector('.card-published').innerText = item.publishDate;
    
    const cardDesc = cardWrap.querySelector('.card-description');    
    
    statusCheckboxToggle(cardWrap.querySelector('.card-change-status-wrapper'));
    selectStatusOption(item, cardDesc, cardWrap.querySelectorAll('.card-status-option'));
    setReadingStatus(item, cardDesc);
    setButtonActions(item, cardDesc);
    if (item.status != "reading") 
        {
            cardDesc.querySelector('.card-reading').style.visibility = 'hidden';
        }

    cardWrap.querySelector("#removeCardBtn").addEventListener('click', () => {deleteBook(cardWrap)});
        
    booksDisplay.appendChild(cardWrap);
}

form.addEventListener('submit', e => {
    e.preventDefault();
    addBookToLibrary();
});

function refreshCards () {
    document.querySelectorAll('.card-wrapper').forEach(item => {item.remove()});
    
    for (i in myLibrary) {
        createCard(myLibrary[i], i);
    }
} 

function statusCheckboxToggle(element) {
    const checkBox = element.querySelector(".card-change-status");
    element.addEventListener('click', e => {
        if (checkBox.checked == true){
            checkBox.checked = false;
        }
        else {
            checkBox.checked = true;
        }
    });
}

function selectStatusOption(book, cardDesc, statusOptions)
{
    statusOptions.forEach(i => {
        if(i.getAttribute('data-state') == book.status)
        {
            i.classList.add('active');
        }
    });

    statusOptions.forEach(item => {
        item.addEventListener('click', e => {
        statusOptions.forEach(i => {i.classList.remove('active')});
        item.classList.add('active');

        if (item.getAttribute('data-state') != book.status) {
            book.status = item.getAttribute('data-state');
        }

        if (item.getAttribute('data-state') == 'reading') {
            setReadingStatus(book, cardDesc);
            cardDesc.querySelector('.card-reading').style.visibility = 'visible';
        }
        else {
            cardDesc.querySelector('.card-reading').style.visibility = 'hidden';
        }
        });
    });
}

function setReadingStatus(book, cardDesc) {
    if (book.status == 'reading') {
        const progress = cardDesc.querySelector('.card-reading-progress');
        const pageNumReading = cardDesc.querySelector('.card-reading-number');

        progress.setAttribute('max', book.pages);
        progress.setAttribute('value', book.currentPage);
        pageNumReading.innerText = book.currentPage;
        
        progress.addEventListener('input', () => {
            progress.setAttribute('value', progress.value);   
            if (parseInt(progress.value) <= parseInt(book.pages) && parseInt(progress.value) >= 0) {
                pageNumReading.innerText = progress.value;
                book.currentPage = progress.value;
            }   
        });
    }
}
// Problem: the value of the book Objects should Decrease, and the progress bar and pageNumReading should update according to the book's currentPage.
function setButtonActions (book, cardDesc) {
        const progress = cardDesc.querySelector('.card-reading-progress');
        const pageNumReading = cardDesc.querySelector('.card-reading-number');
        const subBtn = cardDesc.querySelector("#subPageBtn");
        const addBtn = cardDesc.querySelector('#addPageBtn');

        subBtn.addEventListener('mousedown', () => {
            const pagePrevious = () => {
                if (book.status == 'reading') {
                    if (parseInt(progress.value) > 0) {
                        progress.value--;
                        book.currentPage = progress.value;
                        pageNumReading.innerText = book.currentPage;
                    }
                }
            }; 
            pagePrevious();
            buttonHold(pagePrevious, subBtn);
        });
        
        addBtn.addEventListener('mousedown', () => {
            const pageNext = () => {
                if (book.status == 'reading') {
                    progress.value++;
                    if (parseInt(progress.value) <= parseInt(book.pages)){
                        book.currentPage = progress.value;
                    }
                    pageNumReading.innerText = book.currentPage;
                }
            };
            pageNext();
            buttonHold(pageNext, addBtn);
        });
}

function buttonHold(holdFunction, holdElement) {
    const holdInterval = setInterval(holdFunction, 200);
        holdElement.addEventListener('mouseup', () => {
            clearInterval(holdInterval)
        });
}

function deleteBook (cardWrap) {
    booksDeleted.push(myLibrary.splice(cardWrap.dataset.index, 1)[0]);
    refreshCards();
}

refreshCards();