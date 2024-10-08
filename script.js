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
// const changeStatusLabel = document.querySelector('.card-change-status-wrapper');
// const changeStatusCheckbox = document.querySelector('.card-change-status');
// const bookStatusBtns = document.querySelectorAll('.card-status-option');

let myLibrary = [];
myLibrary.push(new Book("https://i.pinimg.com/originals/60/4e/7b/604e7b5567961081bb4d41e0c6e43d71.png", "Harry Potter and The Half Blood Prince", "J.K. Rowling", "607", "reading", "109", "2005-07-16"));
myLibrary.push(new Book("https://i0.wp.com/americanwritersmuseum.org/wp-content/uploads/2018/02/CK-3.jpg?resize=267%2C400&ssl=1", "The Great Gatsby", "F. Scott Fitzgerald", "180", "not-read", "0", "1925-04-05"));

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
    let inputStatus = 'not-read';
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

    const bookToAdd = new Book(inputImage.value, inputTitle.value, inputAuthor.value, inputPages.value, inputStatus, currentPage, inputPubDate.value);
    myLibrary.push(bookToAdd);
    refreshCards();
}

function createCard(item) {
    const cardWrap = document.createElement('div');
    cardWrap.classList.add('card-wrapper');

    const card = `
        <div class="card-wrapper">
                    <div class="card">
                        <img src="" alt="" class="card-image">
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
                </div>
    `;
    cardWrap.innerHTML = card;
    const img = cardWrap.querySelector('.card-image');
    const cardTitle = cardWrap.querySelector('.card-title');
    const cardAuthor = cardWrap.querySelector('.card-author');
    const cardPages = cardWrap.querySelector('.card-pages');
    const cardPubDate = cardWrap.querySelector('.card-published');
    const statusLabel = cardWrap.querySelector('.card-change-status-wrapper');
    const statusOptions = cardWrap.querySelectorAll('.card-status-option');
    const cardDesc = cardWrap.querySelector('.card-description');
    
    if (item.status != "reading") 
        {
            cardDesc.querySelector('.card-reading').style.visibility = 'hidden';
        }
    
    img.setAttribute('src', item.image);
    cardTitle.innerText = item.title;
    cardAuthor.innerText = item.author;
    cardPages.innerText = item.pages + " Pages";
    cardPubDate.innerText = item.publishDate;
    
    statusCheckboxToggle(statusLabel);
    selectStatusOption(item, cardDesc, statusOptions);
    setReadingStatus(item, cardDesc);
    setButtonActions(item, cardDesc);
    

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
    if (book.status == 'reading') { // setting up progress bar for the current reading page
        const progress = cardDesc.querySelector('.card-reading-progress');
        const pageNumReading = cardDesc.querySelector('.card-reading-number');

        progress.setAttribute('max', book.pages);
        progress.setAttribute('value', book.currentPage);   
        pageNumReading.innerText = book.currentPage;
        
        progress.addEventListener('input', () => {
            progress.setAttribute('value', progress.value);   
            pageNumReading.innerText = progress.value;
            book.currentPage = progress.value;
        });
    }
}

function setButtonActions (book, cardDesc) {
        // Previous Page, Next Page functionality
        const progress = cardDesc.querySelector('.card-reading-progress');
        const pageNumReading = cardDesc.querySelector('.card-reading-number');
        const subBtn = cardDesc.querySelector("#subPageBtn");
        const addBtn = cardDesc.querySelector('#addPageBtn');

        subBtn.addEventListener('mousedown', () => {
            const pagePrevious = () => {
                if (book.status == 'reading') {
                    progress.value--;
                    book.currentPage = progress.value;
                    pageNumReading.innerText = book.currentPage;
                }
            }; 
            pagePrevious();
            buttonHold(pagePrevious, subBtn);
        });
        
        addBtn.addEventListener('mousedown', () => {
            const pageNext = () => {
                if (book.status == 'reading') {
                    progress.value++;
                    book.currentPage = progress.value;
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

refreshCards();