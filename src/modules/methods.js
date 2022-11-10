import {modalShow} from "./modal.js";

const cardContainer = document.getElementById('card-container');
const loading = document.querySelector('.loader');
const modal = document.querySelector('.modal');
const toggleBtn = document.querySelector('input[type="checkbox"]');

let limit = 0;
let page = 0;
let dataFetch = [];

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

async function fillCards() {
    if (toggleBtn.checked) {
        limit = Math.floor((window.innerWidth / 250) * 2);
        page++;
        await getCards()
        showCards()
    }
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

toggleBtn.addEventListener('change', fillCards);

export const getCards = methods.getCards;
export const addCards = methods.addCards;
export const removeLastCard = methods.removeLastCard;
export const clearAllCards = methods.clearAllCards;
export const showLoading = methods.showLoading;
