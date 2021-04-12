
let numberPairs = 0;
let numberCards = 0;
let timerGame = 0;

let numberRounds = 0;
let isThereSelected = false;

let numberPairsSelected = 0;
let objSelected = null;

function dealCards(){
    document.querySelector(".play-game").classList.add("remove-button");
    startTimer();
    numberCards = getNumberCards();
    numberPairs = numberCards / 2;

    let vectorRandomizedOrder = getOrderedIndexes(numberPairs);
    let cardLine1 = document.querySelector(".card-line1");
    let cardLine2 = document.querySelector(".card-line2");
    for(let i = 0;i< numberPairs; i++){
        cardLine1.innerHTML += createCard(i, vectorRandomizedOrder[i]);
    }
    for(let i = numberPairs; i < numberCards; i++){
        cardLine2.innerHTML += createCard(i, vectorRandomizedOrder[i]);
    }
}

function playRound(obj, indexCard, indexPair){
    if(isSelectedCard(obj)){
        return;
    }
    numberRounds += 1;
    selectCard(obj);
    let cardsPair = document.querySelectorAll(`.pair${indexPair}`);
    let broCard = cardsPair[0].classList.contains(`this-index${indexCard}`) ? cardsPair[1] : cardsPair[0];
    if(isThereSelected){
        isThereSelected = false;
        if(isSelectedCard(broCard)){
            numberPairsSelected += 1;
            if(numberPairsSelected === numberPairs){
                finishGame();
            }
            return;
        }
        setTimeout(()=>{
            unSelectCard(objSelected.children);
            unSelectCard(obj.children);
        }, 1000);
    }
    else{
        isThereSelected = true;
        objSelected = obj;
    }
}

function selectCard(obj){
    let objChildren = obj.children;
    objChildren[0].classList.add("front");
    objChildren[1].classList.add("back-onClick");
    if(objChildren[1].classList.contains("back")){
        objChildren[1].classList.remove("back");
    }
}

function isSelectedCard(obj){
    if(obj.children[0].classList.contains("front") && obj.children[1].classList.contains("back-onClick")){
        return true;
    }
    return false;
}

function unSelectCard(objChildren){
    if(objChildren[0].classList.contains("front")){
        objChildren[0].classList.remove("front");
    }
    if(objChildren[1].classList.contains("back-onClick")){
        objChildren[1].classList.remove("back-onClick");
    }
    objChildren[1].classList.add("back");
}

function createCard(indexCard, indexPair){
    let cardLine = `<div class="card this-index${indexCard} pair${indexPair}" onClick="playRound(this, ${indexCard}, ${indexPair})">
                            <div class="card-game">
                                <img src="img/front.png" class="img-front-card">
                            </div>
                            <div class="card-game back">
                                <img src=./img/back${indexPair}.gif class="img-front-card">
                            </div>
                        </div>`;
    return cardLine;
}


function getNumberCards(){
    let inputUser = prompt("Com quantas cartas quer jogar?");
    if(inputUser == null){
        window.location.reload();
    }
    let inputNumberCards = parseInt(inputUser);
    
    while(!(typeof(inputNumberCards) == "number" && inputNumberCards >= 4 && inputNumberCards <= 14 && inputNumberCards %2 === 0)){
        inputUser = prompt("Entrada Inválida\n O número de cartas é um inteiro par entre 4 e 14.\n Digite novamente");
        if(inputUser == null){
            window.location.reload();
        }
        inputNumberCards = parseInt(inputUser);
    }
    return inputNumberCards;
}

function randomizeNumberArray(){
    return 4*(Math.random() -0.5)*(Math.random() -0.5)*(Math.random()-0.5);
}

function getOrderedIndexes(numberOfPairs){
    let vectorIndexes = [];
    for(let i = 0; i< numberOfPairs; i++){
        vectorIndexes.push(i);
        vectorIndexes.push(i);
    }
    vectorIndexes.sort(randomizeNumberArray);
    return vectorIndexes;
}

function startTimer(){
    let hours = 0;
    let minutes = 0;
    let seconds_shown = 0;
    let seconds = 0;
    timerGame = setInterval(()=>{
        seconds += 1;
        hours = Math.floor(seconds/(60*60));
        minutes = Math.floor((seconds %(60*60))/(60));
        seconds_shown = Math.floor(seconds % 60);
        document.querySelector(".timer").innerHTML = `<h2>Seu tempo de Jogo:</h2><p class="timer-text">${hours}h${minutes}m${seconds_shown}s</p>`
    }, 1000);
}

function finishGame(){
    let strTime = document.querySelector(".timer-text").innerHTML;
    clearInterval(timerGame);
    alert(`Parabéns!\nVocê ganhou em ${numberRounds} rodadas!\nSeu tempo de jogo: ${strTime}`);
    let askRestart = confirm("Gostaria de Reiniciar o jogo?");
    if(!askRestart){
        window.location.reload();
    }
    else{
        numberRounds = 0;
        isThereSelected = false;
        numberPairsSelected = 0;
        objSelected = null;

        let cardLine1 = document.querySelector(".card-line1");
        let cardLine2 = document.querySelector(".card-line2");
        for(let item of cardLine1.children){
            unSelectCard(item.children);
        }
        for(let item of cardLine2.children){
            unSelectCard(item.children);
        }
        while(cardLine1.firstChild){
            cardLine1.removeChild(cardLine1.firstChild);
        }
        while(cardLine2.firstChild){
            cardLine2.removeChild(cardLine2.firstChild);
        }
        dealCards();
    }
}