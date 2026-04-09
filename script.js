
class App {
    constructor() {
        this.template = document.querySelector('#card-template');
        this.body = document.querySelector('body');
        this.form = document.querySelector('#book-form');
        this.inputImage = document.querySelector('#image-url');
        this.inputTitle = document.querySelector('#title');
        this.inputAuthor = document.querySelector('#author');
        this.inputPages = document.querySelector('#pages');
        this.statusInputs = document.querySelectorAll('input[name="status"]');
        this.inputCurrPage = document.querySelector('#current-page');
        this.inputPubDate = document.querySelector('#publish-date');
        this.booksDisplay = document.querySelector('.books-display');
        this.noBooks = document.querySelector('.noBooks');
        this.resetButton = document.querySelector('#form-reset');
        this.errorOutput = document.querySelector('.error');
        this.addBookResponse = {success: true, message: null};
        
        this.init();
        this.renderAll();
    }

    init() {
        this.library = new Library();
        this.states = [
            {status: 'not read', name: 'Not Read Yet'},
            {status: 'reading', name: 'Reading'},
            {status: 'read', name: 'Read'}
        ];
        this.sampleBooks = [
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
        this.sampleBooks.forEach(book => this.library.addBook(book));
        this.body.addEventListener('click', bodyEvent => {
            this.body.querySelectorAll('.status-dropdown:has([data-open="true"])').forEach(dropdown => {
                const activeDropDown = bodyEvent.target.closest('.status-dropdown');
                if (activeDropDown != dropdown) {
                    dropdown.querySelector('.status-trigger').dataset.open = 'false';
                }
            });
        });
        this.form.addEventListener('submit', e => {
            e.preventDefault();
            const formData = new FormData(this.form);
            this.addBookResponse = this.library.addBook(Object.fromEntries(formData.entries()))
            this.renderAll();
        });

    }

    renderAll() {
        if (this.addBookResponse.success) {
            this.errorOutput.innerText = ''; 
            this.resetButton.click();
        }
        else {
            this.errorOutput.innerText = this.addBookResponse.message;
            return;
        }
        this.booksDisplay.replaceChildren();
        this.noBooks.style.display = this.library.books.length ? 'none' : 'flex';
        this.library.books.forEach((book) => {
            const card = new Card(book, this);
            this.booksDisplay.appendChild(card.element);
        })
    }
}

class Book {
    constructor(image, title, author, pages, status, publishDate, currentPage) {
            this.id = crypto.randomUUID();
            this.image = image;
            this.title = title;
            this.author = author;
            this.pages = pages;
            this.status = status;
            this.currentPage = currentPage;
            this.publishDate = publishDate;
    }

    updateStatus(newStatus) {
        this.status = newStatus;
    }

    updateCurrentPage(newPage) {
        this.currentPage = parseInt(newPage);
    }
}

class Library {
    constructor () {
        this.books = [];
        this.deletedBooks = [];
    }

    addBook(bookData) {
        const validateStatus = Validate(bookData);
        if (validateStatus !== true) return {success: false, message: validateStatus};
        if (this.books.some(book => book.title.toLowerCase() == bookData.title.trim().toLowerCase() && book.author.toLowerCase() == bookData.author.trim().toLowerCase())) {
            return {success: false, message: `A book named ${bookData.title} written by ${bookData.author} already exists.`};
        }
        const currentPage = bookData.currentPage != 0 ? parseInt(bookData.currentPage) : 1;
        const title = titleCase(bookData.title);
        const author = titleCase(bookData.author);
        const status = bookData.status.toLowerCase();
        const pages = parseInt(bookData.pages);
        const d = new Date(bookData.publishDate);
        const publishDate = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
        this.books.push(new Book(bookData.image, title, author, pages, status, publishDate, currentPage));
        // refreshCards();
        return {success: true, message: null};
    }

    removeBook(id) {
        const bookIndex = this.books.findIndex(book => book.id === String(id));
        if (bookIndex === -1) return false;
        return this.deletedBooks.push(this.books.splice(bookIndex, 1)[0]);
    }
}

class Card {
    constructor (book, app) {
        this.book = book;
        this.app = app;
        this.element = this.app.template.content.cloneNode(true).querySelector('.card');
        this.cardImage = this.element.querySelector('.card-image')
        this.statusTrigger = this.element.querySelector('.status-trigger');
        this.statusTriggerText = this.element.querySelector('.status-text');
        this.statusMenu = this.element.querySelector('.status-menu');
        this.title = this.element.querySelector('.card-title');
        this.author = this.element.querySelector('.card-author');
        this.cardPageText = this.element.querySelector('.card-pages');
        this.publishDate = this.element.querySelector('.card-published');
        this.pagesSection = this.element.querySelector('.card-reading');
        this.progress = this.element.querySelector('.card-reading-progress');
        this.pageNumReading = this.element.querySelector('.card-reading-number');
        this.subBtn = this.element.querySelector(".subPageBtn");
        this.addBtn = this.element.querySelector('.addPageBtn');
        this.deleteBtn = this.element.querySelector('.removeCardBtn');

        this.render();
        this.bindEvents();
        this.updateUI();
    }

    render() {
        this.cardImage.setAttribute('src', this.book.image);
        this.cardImage.addEventListener('error', () => {
        this.cardImage.src = './images/book-cover-placeholder.png';
        this.cardImage.style.border= '2px solid currentColor';
        });
        
        this.element.dataset.id = this.book.id;
        this.title.innerText = this.book.title;
        this.author.innerText = this.book.author;
        this.publishDate.innerText = this.book.publishDate;
        this.statusMenu.innerHTML = '';
        this.app.states.forEach((state, i) => {
            const li = document.createElement('li');
            li.dataset.state = state.status;
            li.dataset.index = i;
            li.innerText = state.name;
            this.statusMenu.appendChild(li);
        });
        
        this.progress.setAttribute('max', this.book.pages);
        this.progress.value = this.book.currentPage;
        this.pageNumReading.innerText = this.book.currentPage;

        if (this.book.pages > 1) {
            this.cardPageText.innerText = this.book.pages + " Pages";
        }
        else {
            this.cardPageText.innerText = this.book.pages + " Page";
        }
    }

    bindEvents () {
        this.statusTrigger.addEventListener('click', () => {
            this.statusTrigger.dataset.open = this.statusTrigger.dataset.open === 'true' ? 'false' : 'true';
        });
        this.statusMenu.addEventListener('click', e => {
            const li = e.target.closest('li');
            if(!li) return;
            const index = li.dataset.index;
            this.book.updateStatus(this.app.states[index].status);
            this.updateUI();
            
        });
        this.deleteBtn.addEventListener('click', () => {
            this.app.library.removeBook(this.element.dataset.id);
            this.app.renderAll();
        });

        this.progress.addEventListener('input', () => {
            const val = parseInt(this.progress.value);
            if (val <= this.book.pages && val >= 0 && this.book.status === 'reading') {
                this.book.updateCurrentPage(val);
                this.updateUI();
            }
        });

        this.subBtn.addEventListener('mousedown', () => {
            const decrease = () => {
                if (this.book.status === 'reading' && this.book.currentPage > 1) {
                    this.book.updateCurrentPage(this.book.currentPage - 1);
                    this.updateUI();
                }
            };
            decrease();
            buttonHold(decrease, this.subBtn);
        });

        this.addBtn.addEventListener('mousedown', () => {
            const increase = () => {
                if (this.book.status === 'reading' && this.book.currentPage < this.book.pages) {
                    this.book.updateCurrentPage(this.book.currentPage + 1);
                    this.updateUI();
                }
            };
            increase();
            buttonHold(increase, this.addBtn);
        });
    }

    updateUI () {
        const state = this.app.states.find(s => s.status === this.book.status)
        this.statusTriggerText.innerText = state.name;
        this.statusTrigger.dataset.open = 'false';
        if (this.book.status == 'reading') {
            this.pagesSection.style.visibility = 'visible';
        }
        else {
            this.pagesSection.style.visibility = 'hidden';
        }

        this.progress.value = this.book.currentPage;
        this.pageNumReading.innerText = this.book.currentPage;

    }
}

function Validate(data) {
    const pages = parseInt(data.pages);
    const currentPage = parseInt(data.currentPage);
    if (data.title.trim() == '') return 'Title is required';
    if (data.author.trim() == '') return 'Author is required';
    if (isNaN(pages)) return 'Number of Pages is required';
    if (pages <= 0) return 'Seriously?\nA book may have zero or negative number of pages in an alternate univerese, but not here.';
    if (data.status == '') return 'Select a status';
    if (data.publishDate == '') return 'Publication date is required';
    if (data.status.toLowerCase() == 'reading') {
        if (isNaN(currentPage)) return 'Current page is required if you are reading the book';
        if (currentPage < 0) return 'Current page cannot be negative';
        if (currentPage > pages) return 'Pages read cannot exceed total pages';
    }
    return true;
}

function buttonHold (action, button) {
    const interval = setInterval(action, 200);
    const clear = () => {
        clearInterval(interval);
    }
    
    button.addEventListener('mouseup', clear, {once: true});
    button.addEventListener('mouseleave', clear, {once: true});
}

function titleCase(string) {
    return string.trim().split(' ').map(word => {return word[0].toUpperCase() + word.slice(1)}).join(' ');
}

const app = new App();