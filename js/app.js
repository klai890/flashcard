document.addEventListener('DOMContentLoaded', app);

function app(){
    addCards();
    renderDecks();
    toHomePage();
    mobileNav()
}


// add the form
function addCards(){
    // get elements
    let plus = document.querySelector('#more-cards');
    let newCards = document.querySelector('#new-cards')
    let controls = document.querySelector('#new-controls')
    let newDeck = document.querySelector('#newDeck');
    let form = document.querySelector('.new-deck')
    let flashcard_home = document.querySelector('.flashcards-home')
    
    // display new deck form
    newDeck.addEventListener('click', ()=>{
        form.classList.remove('hide');
        flashcard_home.classList.add('hide')
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
    // submit the form
    completeAdding();
}

// add cards submission functionality
function completeAdding(){
    // local decks object
    var allDecks = localStorage.getItem('decks') == null ? {} : JSON.parse(localStorage.getItem('decks'));
    
    // elements
    let newCards = document.querySelectorAll('.new-card');
    let decks = document.querySelector('#decks');
    let form = document.querySelector('.new-deck')
    let complete = document.querySelector('#complete');
    let home = document.querySelector('.flashcard-home')
    
    Object.keys(allDecks).forEach(d=>{
        let newDiv = document.createElement('div');
        newDiv.id = `${d.toLowerCase()}-deck`;
        newDiv.classList.add('deck');
        newDiv.innerHTML = d;
        decks.appendChild(newDiv);
    })
    
    
    // when press complete
    complete.addEventListener('click', ()=>{
        // get the new cards
        cards = []
        newCards.forEach(card=>{
            cards.push({
                'front': card.children[0].value,
                'back': card.children[1].value
            })
        })
        
        complete.addEventListener('click', ()=>{
            // Add to decks
            let deckName = String(document.querySelector('#newDeckName').innerText);

            // update decks object
            allDecks[deckName] = cards;
            
            // update decks in local storage
            localStorage.setItem('decks', JSON.stringify(allDecks));
            
            // add the new deck name to side
            let newDiv = elem('div');
            newDiv.innerHTML = deckName;
            decks.appendChild(newDiv);
            
            // hide new deck form
            form.classList.add('hide');
            home.classList.remove('hide')
        })
    })
}   

// render seperate decks on click
function renderDecks(){
    // elements
    let allDeckObj = JSON.parse(localStorage.getItem('decks'));
    let decks = document.querySelectorAll('.deck');
    let flashcards_page = document.querySelector('#flashcards');
    let flashcards_home = document.querySelector('.flashcards-home')
    let lastCard = document.querySelector('#last-card')
    let renderName = document.querySelector('#currentDeckName')
    let flashcards = document.querySelector('.slider');
    let form = document.querySelector('.new-deck')
    
    // render flashcards to screen
    decks.forEach(deck=>{
        deck.addEventListener('click', ()=>{
            // switch flashcards, if necessary
            flashcards.style.transition = 'transform .01s';
            flashcards.style.transform = 'translateX(0)';

            flashcards.addEventListener('transitionend', ()=>{
                flashcards.style.transition = 'transform .5s ease-in-out';
            })

            // render flashcards to screen, hide flashcard_home page
            flashcards_page.classList.remove('hide');
            flashcards_home.classList.add('hide');
            form.classList.add('hide');
            
            name = deck.innerText;
            cards = allDeckObj[name];
            renderName.innerText = name;

            let toRemove = flashcards.querySelectorAll('.deck-card')
            toRemove.forEach(card=>{
                card.remove()
            })
            
            cards.forEach(card=>{
                // remove other deck cards from DOM
                // render new cards to DOM
                let outerDiv = elem('div');
                outerDiv.classList.add('card-container')
                outerDiv.classList.add('deck-card')

                let innerDiv = elem('div');
                innerDiv.classList.add('card')
                let front = elem('div');
                front.classList.add('front');
                let back = elem('div')
                back.classList.add('back')
                
                front.innerText = card.front;
                back.innerText = card.back;
                
                innerDiv.appendChild(front);
                innerDiv.appendChild(back);
                outerDiv.appendChild(innerDiv);
                flashcards.insertBefore(outerDiv, lastCard);

                slider()
            })
        })
    })
}

// document.createElement('x') got very annoying
function elem(name){
    return document.createElement(name)
}

// control flashcard sliding
function slider(){
    const prev = document.querySelector('#prev');
    const next = document.querySelector('#next');
    const slider = document.querySelector('.slider');
    const cards = document.querySelectorAll('.card-container')

    num_cards = cards.length;
    let curr = 0;

    prev.addEventListener('click', ()=>{
        if (curr !== 0){
            curr--;
            slider.style.transform = `translateX(-${curr}00%)`;
            console.log(slider)
        }
    })
    
    next.addEventListener('click', ()=>{
        if (curr !== num_cards - 1){
            curr++;
            slider.style.transform = `translateX(-${curr}00%)`;
        }
    })

    cards.forEach(card=>{
        card.onclick =  ()=>{card.classList.toggle('flip')}
    })
}

// render home page
function toHomePage(){
    let homeLink = document.querySelector('#flashcards-home-page')
    let flashcards_page = document.querySelector('#flashcards');
    let flashcards_home = document.querySelector('.flashcards-home')

    homeLink.addEventListener('click', ()=>{
        flashcards_home.classList.remove('hide')
        flashcards_page.classList.add('hide')
    })
}

function mobileNav(){
    let sidebar = document.querySelector('.sidebar');
    let burger = document.querySelector('.burger');
    burger.addEventListener('click', ()=>{
        sidebar.classList.toggle('slideIn');
        burger.classList.toggle('white')
    })
}