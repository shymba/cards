import './index.html';
import './style.css';
import './modules/modal.js'

import {addCards, showLoading, fillCards, clearAllCards, removeLastCard} from "./modules/methods.js";

const addBtn = document.getElementById('add-card');
const clearAllBtn = document.getElementById('clear-all-card');
const fillBtn = document.getElementById('fill-container');
const removeLastBtn = document.getElementById('remove-last');

addBtn.addEventListener('click', addCards);
removeLastBtn.addEventListener('click', removeLastCard);
fillBtn.addEventListener('click', fillCards);
clearAllBtn.addEventListener('click', clearAllCards);

window.addEventListener('scroll', () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

    if(scrollTop + clientHeight >=scrollHeight - 5) {
        showLoading()
    }
})



