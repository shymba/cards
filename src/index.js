import './index.html';
import './style.css';
import './modules/modal.js'

import {addCards, showLoading, clearAllCards, removeLastCard} from "./modules/methods.js";

const addBtn = document.getElementById('add-card');
const clearAllBtn = document.getElementById('clear-all-card');
const removeLastBtn = document.getElementById('remove-last');

addBtn.addEventListener('click', addCards);
removeLastBtn.addEventListener('click', removeLastCard);
clearAllBtn.addEventListener('click', clearAllCards);

window.addEventListener('scroll', () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

    if(scrollTop + clientHeight >=scrollHeight - 5) {
        showLoading()
    }
})



