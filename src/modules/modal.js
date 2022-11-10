const modal = document.querySelector('.modal');
const modalText = document.getElementById('modal-text');
const btnQuote = document.getElementById('quote');
const quoteText = document.querySelector('.quote-text')

export const modalShow = (event) => {
    const modalContent = event.target.getAttribute('value');
    modalText.innerText = modalContent

    modal.style.display = "block";
}

btnQuote.addEventListener('click', () => {
    quoteText.style.display = 'block'
    modalShowQuote();
    setTimeout(() => {
        quoteText.style.display = 'none'
    },2000);

})

function modalShowQuote() {

    let r_text = new Array ();
    r_text[0] = "Be yourself; everyone else is already taken.";
    r_text[1] = "Two things are infinite: the universe and human stupidity; and I'm not sure about the universe.";
    r_text[2] = "You only live once, but if you do it right, once is enough.";
    r_text[3] = "In three words I can sum up everything I've learned about life: it goes on.";
    r_text[4] = "There are only two ways to live your life. One is as though nothing is a miracle. The other is as though everything is a miracle.";
    r_text[5] = "The man who does not read has no advantage over the man who cannot read.";
    r_text[6] = "I like nonsense, it wakes up the brain cells. Fantasy is a necessary ingredient in living.";
    r_text[7] = "Never put off till tomorrow what may be done day after tomorrow just as well.";
    r_text[8] = "I love deadlines. I love the whooshing noise they make as they go by.";
    r_text[9] = "I have always imagined that Paradise will be a kind of library.";

    let i = Math.floor(r_text.length * Math.random());
    quoteText.innerText = r_text[i];
}
