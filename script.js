const body = document.querySelector('body');
const form = document.querySelector('form');
const inputImage = document.querySelector('#image-url');
const inputTitle = document.querySelector('#title');
const inputAuthor = document.querySelector('#author');
const inputPages = document.querySelector('#pages');
// const inputstatus = document.querySelector('#status');
const statusInputs = document.querySelectorAll('input[name="status"]'); 
const inputCurrPage = document.querySelector('#current-page');
const inputPubDate = document.querySelector('#publish-date');
const booksDisplay = document.querySelector('.books-display');
// const deleteIconSVG = '<svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#e8eaed"><path d="M312-144q-29.7 0-50.85-21.15Q240-186.3 240-216v-480h-48v-72h192v-48h192v48h192v72h-48v479.57Q720-186 698.85-165T648-144H312Zm336-552H312v480h336v-480ZM384-288h72v-336h-72v336Zm120 0h72v-336h-72v336ZM312-696v480-480Z"/></svg>';
// const changeStatusLabel = document.querySelector('.card-change-status-wrapper');
// const changeStatusCheckbox = document.querySelector('.card-change-status');
// const bookStatusBtns = document.querySelectorAll('.card-status-option');

// svgs
// const moreIcon = '<svg xmlns="http://www.w3.org/2000/svg" class="more-icon" viewBox="0 -960 960 960" fill="#e8eaed"><path d="M480-160q-33 0-56.5-23.5T400-240q0-33 23.5-56.5T480-320q33 0 56.5 23.5T560-240q0 33-23.5 56.5T480-160Zm0-240q-33 0-56.5-23.5T400-480q0-33 23.5-56.5T480-560q33 0 56.5 23.5T560-480q0 33-23.5 56.5T480-400Zm0-240q-33 0-56.5-23.5T400-720q0-33 23.5-56.5T480-800q33 0 56.5 23.5T560-720q0 33-23.5 56.5T480-640Z"/></svg>';
// const deleteIcon = '<svg xmlns="http://www.w3.org/2000/svg" class="delete-icon" height="20px" viewBox="0 -960 960 960" width="20px" fill="#e8eaed"><path d="M312-144q-29.7 0-50.85-21.15Q240-186.3 240-216v-480h-48v-72h192v-48h192v48h192v72h-48v479.57Q720-186 698.85-165T648-144H312Zm336-552H312v480h336v-480ZM384-288h72v-336h-72v336Zm120 0h72v-336h-72v336ZM312-696v480-480Z"/></svg>';

let myLibrary = [];

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

    const bookToAdd = new Book(inputImage.value, inputTitle.value, inputAuthor.value, inputPages.value, inputStatus, inputCurrPage.value, inputPubDate.value);
    myLibrary.push(bookToAdd);
    refreshCards();
}

function createCard(item) {
    const cardWrap = document.createElement('div');
    cardWrap.classList.add('card-wrapper');

        // const card = document.createElement('div');
        // card.classList.add('card');
        // cardWrap.appendChild(card);
    
        //     const img = document.createElement('img');
        //     img.classList.add('card-image');
        //     img.setAttribute('src', item.image);
        //     card.appendChild(img);

        //     const cardDesc = document.createElement('div');
        //     cardDesc.classList.add('card-description');
        //     card.appendChild(cardDesc);

        //         const cardStatusWrap = document.createElement('div');
        //         cardStatusWrap.classList.add('card-status-wrapper');
        //         cardDesc.appendChild(cardStatusWrap);

        //             const cardChangeStatusWrap = document.createElement('label');
        //             cardChangeStatusWrap.classList.add('card-change-status-wrapper');
        //             cardChangeStatusWrap.setAttribute('for', 'statusBtn');
        //             cardStatusWrap.appendChild(cardChangeStatusWrap);

        //                 const cardStatusOpts = document.createElement('div');
        //                 cardStatusOpts.classList.add('card-status-options');
        //                 cardChangeStatusWrap.appendChild(cardStatusOpts);

        //                     const notReadBtn = document.createElement('button');
        //                     notReadBtn.classList.add('card-status-option')
        //                     notReadBtn.setAttribute('id', 'state-not-read');
        //                     cardStatusOpts.appendChild(notReadBtn);

        //                         const notReadHead = document.createElement('h4'); 
        //                         notReadHead.innerText = 'Not Read Yet';
        //                         notReadBtn.appendChild(notReadHead);

        //                     const readingBtn = document.createElement('button');
        //                     readingBtn.classList.add('card-status-option')
        //                     readingBtn.setAttribute('id', 'state-reading');
        //                     cardStatusOpts.appendChild(readingBtn);

        //                         const readingHead = document.createElement('h4'); 
        //                         readingHead.innerText = 'Reading';
        //                         readingBtn.appendChild(readingHead);

        //                     const readBtn = document.createElement('button');
        //                     readBtn.classList.add('card-status-option')
        //                     readBtn.setAttribute('id', 'state-not-read');
        //                     cardStatusOpts.appendChild(readBtn);

        //                         const readHead = document.createElement('h4'); 
        //                         readHead.innerText = 'Read';
        //                         readBtn.appendChild(readHead);

        //                     cardChangeStatusWrap.innerHTML += '<input type="checkbox" class="card-change-status" id="statusBtn">';
        //                     cardChangeStatusWrap.innerHTML += moreIcon;
        //                     console.log(cardChangeStatusWrap.querySelector('.card-change-status'));
        //                     statusCheckboxToggle(cardChangeStatusWrap.querySelector('.card-change-status'));
                            
        //                     selectStatusOption(cardStatusOpts.querySelectorAll(".card-status-option"));

        //             const cardRemoveBtn = document.createElement('button');
        //             cardRemoveBtn.classList.add('card-button', 'card-remove');
        //             cardRemoveBtn.setAttribute('id', 'removeCardBtn');                    
        //             cardRemoveBtn.innerHTML = deleteIcon;
        //             cardStatusWrap.appendChild(cardRemoveBtn);

        //         const cardTitle = document.createElement('h3');
        //         cardTitle.classList.add('card-title');
        //         cardDesc.appendChild(cardTitle);

        //         const cardAuthor = document.createElement('h5');
        //         cardAuthor.classList.add('card-author');
        //         cardDesc.appendChild(cardAuthor);

        //         const cardPageDate = document.createElement('div');
        //         cardPageDate.classList.add('card-page-date-group');
        //         cardDesc.appendChild(cardPageDate);

        //         const cardReading = document.createElement('div');
        //         cardReading.classList.add('card-reading');
        //         cardDesc.appendChild(cardReading);

    const card = `
        <div class="card-wrapper">
                    <div class="card">
                        <img src="" alt="" class="card-image">
                        <div class="card-description">
                            <div class="card-status-wrapper"> 
                                    <label for="statusBtn" class="card-change-status-wrapper">
                                            <div class="card-status-options">
                                                <button class="card-status-option" id="state-not-read"><h4>Not Read Yet</h4></button>
                                                <button class="card-status-option" id="state-reading"><h4>Reading</h4></button>
                                                <button class="card-status-option" id="state-read"><h4>Read</h4></button>
                                            </div>
                                            <input type="checkbox" class="card-change-status" id="statusBtn">
                                            <svg xmlns="http://www.w3.org/2000/svg" class="more-icon" viewBox="0 -960 960 960" fill="#e8eaed"><path d="M480-160q-33 0-56.5-23.5T400-240q0-33 23.5-56.5T480-320q33 0 56.5 23.5T560-240q0 33-23.5 56.5T480-160Zm0-240q-33 0-56.5-23.5T400-480q0-33 23.5-56.5T480-560q33 0 56.5 23.5T560-480q0 33-23.5 56.5T480-400Zm0-240q-33 0-56.5-23.5T400-720q0-33 23.5-56.5T480-800q33 0 56.5 23.5T560-720q0 33-23.5 56.5T480-640Z"/></svg>
                                    </label>
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
                                        <button class="card-page-change-button" id="addPageBtn">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill=""><path d="M472-480 332-620q-18-18-18-44t18-44q18-18 44-18t44 18l183 183q9 9 14 21t5 24q0 12-5 24t-14 21L420-252q-18 18-44 18t-44-18q-18-18-18-44t18-44l140-140Z"/></svg>
                                        </button>
                                        <h6 class="card-reading-page">Page <span class="card-reading-number">0</span></h6>
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
    const statusOptions = cardWrap.querySelectorAll('.card-status-option');
    // const 

    img.setAttribute('src', item.image);
    cardTitle.innerText = item.title;
    cardAuthor.innerText = item.author;
    cardPages.innerText = item.pages + " Pages";
    cardPubDate.innerText = item.publishDate;
    
    activateStatus(statusOptions, item.status);


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

// function statusCheckboxToggle(item) {
//     item.addEventListener('click', e => {
//         if (item.checked == true){
//             item.checked = false;
//             console.log('checkbox false now');
//         }
//         else {
//             item.checked = true;
//             console.log('checkbox true now');
//         }
//     });
// }

function activateStatus(options, status) {
    options.forEach(i => {
        if(i.getAttribute('id') == `state-${status}`)
        {
            i.classList.add('active');
        }
    });
}

function selectStatusOption(items)
{
    items.forEach(item => {
        // console.log(item);
        item.addEventListener('click', e => {
            console.log('clicked');
        items.forEach(i => {i.classList.remove('active')});
        e.target.closest('.card-status-option').classList.add('active');
        
        // console.log(e.target);
        });
    });
}

// refreshCards();