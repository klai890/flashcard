document.addEventListener('DOMContentLoaded', app);
var decks = {
    'calculus': [{
        'front': 'derivative',
        'back': 'rate of change'
    }],
    'python': [{
        'front': 'tuple',
        'back': 'immutable list'
    }]
}

function app(){
    slider()
    addCards()
    completeAdding()
}

// control flashcard sliding
function slider(){
    const prev = document.querySelector('#prev');
    const next = document.querySelector('#next');
    const slider = document.querySelector('.slider');
    const cards = document.querySelectorAll('.card-container')

    num_cards = cards.length;
    curr = 0;

    prev.addEventListener('click', ()=>{
        console.log('prev clicked!')
        if (curr !== 0){
            curr--;
            cards.forEach(card=>{
                card.style.transform = `translateX(-${curr}00%)`;
                console.log(card)
            })
        }
    })

    next.addEventListener('click', ()=>{
        if (curr !== num_cards - 1){
            console.log('next clicked!')
            curr++;
            cards.forEach(card=>{
                card.style.transform = `translateX(-${curr}00%)`;
                console.log(card)
            })
        }
    })

    cards.forEach(card=>{
        card.addEventListener('click', ()=>{
            card.classList.toggle('flip')
        })
    })

}

// add cards form functionality
function addCards(){
    // get elements
    let plus = document.querySelector('#more-cards');
    let newCards = document.querySelector('#new-cards')
    let controls = document.querySelector('#new-controls')
    let newDeck = document.querySelector('#newDeck');
    let form = document.querySelector('.new-deck')

    // display new deck form
    newDeck.addEventListener('click', ()=>{
        form.classList.add('show')
    })


    // add card
    plus.addEventListener('click', ()=>{
        newCard = document.createElement('div');
        newCard.classList.add('new-card')
        
        front = document.createElement('textarea');
        front.classList.add('new-front')
        front.placeholder = 'Front of Card';

        back = document.createElement('textarea')
        back.classList.add('new-back');
        back.placeholder = 'Back of Card'

        newCard.appendChild(front)
        newCard.appendChild(back)
        newCards.insertBefore(newCard, controls);

    })
}

// add cards submission functionality
function completeAdding(){
    // elements
    let deckName = String(document.querySelector('#newDeckName').innerText);
    let newCards = document.querySelectorAll('.new-card');
    let submit = document.querySelector('#complete');
    let decks = document.querySelector('.decks');
    let form = document.querySelector('.new-deck')
    complete = document.querySelector('#complete');

    // when press complete
    complete.addEventListener('click', ()=>{
        cards = []

        newCards.forEach(card=>{
            cards.push({
                'front': card.children[0].value,
                'back': card.children[1].value
            })
        })

        complete.addEventListener('click', ()=>{
            // Add to decks
            // first, check if name taken
            if (decks != null && deckName in Object.keys(decks)){
                console.log('taken')
            }
            // if not taken...
            else{
                // update decks object
                decks[deckName] = cards;
                // store to local storage
                if (!localStorage.getItem('decks')){
                    console.log('false')
                    localStorage.setItem('decks', decks)
                }

                // hide new deck form
                form.classList.remove('show')
            }

        })
    })
}   