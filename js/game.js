let cardsClicked = 0;
let previousElement, matches = 0;

function flip(ele){

    if(game){

        if(ele.children[0].style.backgroundColor === 'whitesmoke'){
            return
        }
    
        if((previousElement && (previousElement.id !== ele.id)) || !cardsClicked)
            cardsClicked += 1;
    
        if(cardsClicked == 1){
    
            previousElement = ele;
            previousElement.children[1].style.visibility = 'hidden';
    
        } if(cardsClicked == 2){
    
            ele.children[1].style.visibility = 'hidden';
    
            if(previousElement.children[0].style.backgroundColor === ele.children[0].style.backgroundColor){
                
                setTimeout(() => {
                    previousElement.children[0].style.backgroundColor = 'whitesmoke';
                    ele.children[0].style.backgroundColor = 'whitesmoke';
                    ele.children[0].children[0].style.visibility = 'visible';
                    previousElement.children[0].children[0].style.visibility = 'visible';
                    cardsClicked = 0;
                }, 250);
                
                matches += 1;

            } else {
                setTimeout(() => {
                    ele.children[1].style.visibility = 'visible';
                    previousElement.children[1].style.visibility = 'visible';
                    cardsClicked = 0;
                }, 250);
                
            }
        }
    }

}

const colorPlate = ['red', 'blue', 'green', 'yellow', 'orange', 'dodgerblue', 'pink', 'purple']

const cards = document.querySelectorAll('.card');

let colorCount = cards.length;

let cardCol = []

function generateColors(){
    for(let i = 0; i < colorPlate.length; i++){
        cardCol[i] = 2
    }
    
    for(let i = 0; i < cards.length; i++){
        cards[i].id = i;
        cards[i].children[0].style.backgroundColor = colorPlate[generateInd(colorPlate)];
    }
}

generateColors()

function generateInd(colors){
    while(colorCount){
        const ind = Math.floor(Math.random() * colors.length)
        if(cardCol[ind] > 0){
            cardCol[ind] -= 1
            colorCount -= 1
            return ind
        }
    }
}

let gameTime = 30, game = false;

let status = document.querySelector('.status');

function start(){

    if(gameTime == 0) {
        reset();
    }

    if(!game){
        game = true;
        checkGame()
    } 
    
}

function reset(){
    gameTime = 30;
    colorCount = 16;
    generateColors();
    resetCards()
    cardsClicked = 0
    matches = 0
    document.querySelector('.status h1').innerHTML = '00:30';
    document.querySelector('.status h1').style.color = 'tomato';
}

function checkGame(){
    let id = setInterval(() => {

        if(gameTime > 0){

            gameTime -= 1;

            let hh;

            if(gameTime > 9)
                hh = '00:'
            else
                hh = '00:0'

            document.querySelector('.status h1').innerHTML = hh + gameTime;
        }    
        if(gameTime == 0) {
            clearInterval(id)
            game = false;
            document.querySelector('.status h1').innerHTML = 'You Lost!';
            document.querySelector('.btn').innerHTML = 'Play Again'
        }

        if(matches == 8){
            clearInterval(id)
            document.querySelector('.status h1').innerHTML = 'You Won';
            document.querySelector('.status h1').style.color = 'lightgreen';
            game = false;
            gameTime = 0;
            document.querySelector('.btn').innerHTML = 'Play Again'
        }
        
    }, 1000);
}

function resetCards(){
    for(let i = 0; i < cards.length; i++)
        cards[i].children[1].style.visibility = 'visible'

    for(let i = 0; i < cards.length; i++)
        cards[i].children[0].children[0].style.visibility = 'hidden'
}