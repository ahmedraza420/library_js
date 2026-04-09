const template = document.querySelector('#card-template');
const body = document.querySelector('body');
const form = document.querySelector('#book-form');
const inputImage = document.querySelector('#image-url');
const inputTitle = document.querySelector('#title');
const inputAuthor = document.querySelector('#author');
const inputPages = document.querySelector('#pages');
const statusInputs = document.querySelectorAll('input[name="status"]');
const inputCurrPage = document.querySelector('#current-page');
const inputPubDate = document.querySelector('#publish-date');
const booksDisplay = document.querySelector('.books-display');
const noBooks = document.querySelector('.noBooks');
const resetButton = document.querySelector('#form-reset');
const errorOutput = document.querySelector('.error');

let myLibrary = [];
let booksDeleted = [];  // could be used to undo a mistake
let states = [
    {status: 'not read', name: 'Not Read Yet'},
    {status: 'reading', name: 'Reading'},
    {status: 'read', name: 'Read'}];

let sampleBooks = [
    {
        image: "https://i.pinimg.com/originals/60/4e/7b/604e7b5567961081bb4d41e0c6e43d71.png",
        title: "Harry Potter and The Half Blood Prince",
        author: "J.K. Rowling",
        pages: "607",
        status: "reading",
        publishDate: "2005-07-16",
        currentPage: "109"
    },
    {
        image: "https://i0.wp.com/americanwritersmuseum.org/wp-content/uploads/2018/02/CK-3.jpg?resize=267%2C400&ssl=1",
        title: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
        pages: "180",
        status: "not read",
        publishDate: "1925-04-05",
        currentPage: "0"
    },
    {
        image: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1409600899i/9723667.jpg",
        title: "And Then There Were None",
        author: "Agatha Christie",
        pages: "272",
        status: "read",
        publishDate: '1939-11-06',
        currentPage: '0'
    }
];

body.addEventListener('click', bodyEvent => {
    document.querySelectorAll('.status-dropdown:has([data-open="true"])').forEach(dropdown => {
        const activeDropDown = bodyEvent.target.closest('.status-dropdown');
        if (activeDropDown != dropdown) {
            dropdown.querySelector('.status-trigger').dataset.open = 'false';
        }
    });
});

sampleBooks.forEach(book => {
    addBookToLibrary(book);
});

function Book(image, title, author, pages, status, publishDate, currentPage) {
    this.id = crypto.randomUUID();
    this.image = image;
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.status = status;
    this.currentPage = currentPage;
    this.publishDate = publishDate;
}

// validate the form inputs
function Validate(data) {
    const pages = parseInt(data.pages);
    const currentPage = parseInt(data.currentPage);
    if (data.title.trim() == '') return 'Title is required';
    if (data.author.trim() == '') return 'Author is required';
    if (pages <= 0) return 'Seriously?\nA book may have zero or negative number of pages in an alternate univerese, but not here.';
    if (data.status == '') return 'Select a status';
    if (data.publishDate == '') return 'Publication date is required';
    if (data.status.toLowerCase() == 'reading') {
        if (currentPage == '') return 'Current page is required if you are reading the book';
        if (!isNaN(currentPage) && currentPage < 0) return 'Current page cannot be negative';
        if (currentPage > pages) return 'Pages read cannot exceed total pages';
    }
    return true;
}

function addBookToLibrary(data) {
    //REMINDER: need to output the validation errors [done]
    const validateStatus = Validate(data);
    if (validateStatus === true) {
        errorOutput.innerText = '';
        if (myLibrary.some(book => book.title.toLowerCase() == data.title.toLowerCase() && book.author.toLowerCase() == data.author.toLowerCase())) {
            errorOutput.innerText = `A book named ${data.title} written by ${data.author} already exists.`;
        }
        else {
            const currentPage = data.currentPage != 0 ? parseInt(data.currentPage) : 1;
            const title = titleCase(data.title);
            const author = titleCase(data.author);
            const status = data.status.toLowerCase();
            const pages = parseInt(data.pages);
            const d = new Date(data.publishDate);
            const publishDate = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
            myLibrary.push(new Book(data.image, title, author, pages, status, publishDate, currentPage));
            refreshCards();
            resetButton.click();
        }
    }
    else {
        errorOutput.innerText = validateStatus;
    }
}

function createCard(item) {
    const clone = template.content.cloneNode(true);
    const card = clone.querySelector('.card');
    const cardImage = clone.querySelector('.card-image')
    const statusTrigger = clone.querySelector('.status-trigger');
    const statusTriggerText = clone.querySelector('.status-text');
    const statusMenu = clone.querySelector('.status-menu');
    const title = clone.querySelector('.card-title');
    const author = clone.querySelector('.card-author');
    const cardPageText = clone.querySelector('.card-pages');
    const publishDate = clone.querySelector('.card-published');
    const pagesSection = clone.querySelector('.card-reading');
    const progress = clone.querySelector('.card-reading-progress');
    const pageNumReading = clone.querySelector('.card-reading-number');
    const subBtn = clone.querySelector(".subPageBtn");
    const addBtn = clone.querySelector('.addPageBtn');
    const deleteBtn = clone.querySelector('.removeCardBtn');

    card.dataset.id = item.id;
    title.innerText = item.title;
    author.innerText = item.author;
    statusMenu.innerHTML = '';
    states.forEach((state, i) => {
        const li = document.createElement('li');
        li.dataset.state = state.status;
        li.dataset.index = i;
        li.innerText = state.name;
        statusMenu.appendChild(li);
    });

    cardImage.setAttribute('src', item.image);
    cardImage.addEventListener('error', () => {
        cardImage.src = './images/book-cover-placeholder.png';
        cardImage.style.border= '2px solid currentColor';
    });
    if (parseInt(item.pages) > 1) {
        cardPageText.innerText = item.pages + " Pages";
    }
    else {
        cardPageText.innerText = item.pages + " Page";
    }
    publishDate.innerText = item.publishDate;



    statusTrigger.addEventListener('click', () => {
        statusTrigger.dataset.open = statusTrigger.dataset.open === 'true' ? 'false' : 'true';
    });

    updateStatus(item, pagesSection, item.status,  states.find(state => state.status === item.status).name, statusTriggerText);
    statusMenu.addEventListener('click', e => {
        if (e.target.tagName.toLowerCase() == 'li') {
            const index = e.target.dataset.index;
            updateStatus(item, pagesSection, states[index].status, states[index].name, statusTriggerText);
            updateReading(item, progress, pageNumReading);
            statusTrigger.dataset.open = 'false';
        }
        
    });
    
    initReading(item, progress, pageNumReading, addBtn, subBtn);
    updateReading(item, progress, pageNumReading);
    deleteBtn.addEventListener('click', () => { deleteBook(card.dataset.id) });

    booksDisplay.appendChild(card);
}

form.addEventListener('submit', e => {
    e.preventDefault();
    const formData = new FormData(form);
    addBookToLibrary(Object.fromEntries(formData.entries()));
});

function refreshCards() {
    booksDisplay.replaceChildren();
    noBooks.style.display = myLibrary.length ? 'none' : 'flex';
    myLibrary.forEach((book) => {
        noBooks.style.display = 'none';
        createCard(book);
    })
}

function updateStatus(book, pagesSection, newStatus, statusName, displayStatus) {
    book.status = newStatus;
    displayStatus.innerText = statusName;
    if (book.status == 'reading') {
        pagesSection.style.visibility = 'visible';
    }
    else {
        pagesSection.style.visibility = 'hidden';
    }

}

function initReading(book, progress, pageNumReading, addBtn, subBtn) {
    progress.setAttribute('max', book.pages);
    progress.value = book.currentPage;
    pageNumReading.innerText = book.currentPage;

    progress.addEventListener('input', () => {
        const val = parseInt(progress.value);
        if (val <= book.pages && val >= 0 && book.status === 'reading') {
            book.currentPage = val;
            pageNumReading.innerText = book.currentPage;
        }
    });

    const buttonHold = (action, button) => {
        const interval = setInterval(action, 200);
        const clear = () => clearInterval(interval);
        button.addEventListener('mouseup', clear, {once: true});
        button.addEventListener('mouseleave', clear, {once: true});
    }

    // Problem: the value of the book Objects should Decrease, and the progress bar and pageNumReading should update according to the book's currentPage. [done]
    subBtn.addEventListener('mousedown', () => {
        const decrease = () => {
            if (book.status === 'reading' && book.currentPage > 1) {
                book.currentPage--;
                progress.value = book.currentPage;
                pageNumReading.innerText = book.currentPage;
            }
        };
        decrease();
        buttonHold(decrease, subBtn);
    });

    addBtn.addEventListener('mousedown', () => {
        const increase = () => {
            if (book.status === 'reading' && book.currentPage < book.pages) {
                book.currentPage++;
                progress.value = book.currentPage;
                pageNumReading.innerText = book.currentPage;
            }
        };
        increase();
        buttonHold(increase, addBtn);
    });
}

function updateReading(book, progress, pageNumReading) {
    progress.value = book.currentPage;
    pageNumReading.innerText = book.currentPage;
}


function deleteBook(id) {
    const bookIndex = myLibrary.findIndex(book => book.id === String(id));
    if (bookIndex === -1) return;
    booksDeleted.push(myLibrary.splice(bookIndex, 1)[0]);
    refreshCards();
}

function titleCase(string) {
    return string.split(' ').map(word => {return word[0].toUpperCase() + word.slice(1)}).join(' ');
}

refreshCards();