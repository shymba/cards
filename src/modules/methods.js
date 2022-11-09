import {modalShow} from "./modal.js";

const cardContainer = document.getElementById('card-container');
const loading = document.querySelector('.loader');
const modal = document.querySelector('.modal');
const toggleBtn = document.querySelector('input[type="checkbox"]');

let limit = 0;
let page = 0;
let dataFetch = [];

async function fillCards() {

    if(toggleBtn.checked) {
        limit = 10;
        page ++;
        await getCards()
            showCards()
        console.log(window.innerHeight);
        console.log(window.innerWidth);

        console.log('checked')
    } else  {
        limit = 0;
        page = 0;
        await getCards()
        showCards()
        console.log('no checked')
    }
}

toggleBtn.addEventListener('change', fillCards)

const methods = {
    getCards: async () => {
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=${limit}=&_page=${page}`)
        const data = await response.json()
        data.forEach(card => dataFetch.push(card))
    },
    addCards: async () => {
        limit = 1;
        page ++;
        await getCards();
        showCards();
    },
    removeLastCard: () => {
        dataFetch.pop();
        showCards();
    },
    // fillCards: async () => {
    //     limit = 12;
    //     await getCards()
    //     showCards()
    // },
    clearAllCards: () => {
        dataFetch = dataFetch.slice(0, 1);
        showCards();
    },
    showLoading: () => {
        loading.classList.add('show');
        setTimeout(() => {
            loading.classList.remove('show');

            setTimeout(() => {
                addCards()
            }, 300)

        }, 1000)
    }
}

function showCards() {

    cardContainer.innerHTML = '';
    dataFetch.forEach(card => {
        const cardEl = document.createElement('div');
        const cardElLoad = document.createElement('div');
        const cardInfo = document.createElement('div');
        cardEl.classList.add('card');
        cardElLoad.classList.add('pre-louder');
        cardInfo.classList.add('card-info');
        cardInfo.innerHTML = `
            <div class="numberID">${card.id}</div>
                <h2 class="card-title">${card.title}</h2>
                <p class="card-body">${card.body}</p>
            <div class="cards-btns">
                <button class="btn modal-btn modal-show" value="${card.body}">Modal</button>
                <button id="${card.id}" class="btn modal-btn removeCard">Remove</button>
            </div>
        `;

        const btnShowModal = cardInfo.querySelector('.modal-show');
        btnShowModal.addEventListener('click', modalShow)

        const btnRemoveById = cardInfo.querySelector('.removeCard');
        btnRemoveById.addEventListener('click', removeCard);

        cardEl.appendChild(cardElLoad);
        cardEl.appendChild(cardInfo);
        cardContainer.appendChild(cardEl);

        cardInfo.style.opacity = 0;
        cardElLoad.style.opacity = 1;

        setTimeout(() => {
            cardInfo.style.opacity = 1;
            cardElLoad.style.opacity = 0;
        },1000);

    });
}

function removeCard(event) {
    const idModal = +event.target.getAttribute('id');
    dataFetch = dataFetch.filter(card => card.id !== idModal);

    showCards();
}

window.onclick = function(e) {
    if (e.target === modal) {
        modal.style.display = "none";
    }
}

export const getCards = methods.getCards;
export const addCards = methods.addCards;
export const removeLastCard = methods.removeLastCard;
// export const fillCards = methods.fillCards;
export const clearAllCards = methods.clearAllCards;
export const showLoading = methods.showLoading;
