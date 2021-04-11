/* Global Variables */

let oneCardOpen = false;
let cardOpenPair = 0;
let firstCardSelected = "";
let openPairNumber = 0;
let numberRounds = 0;

/* Functions Definitions */

function dealCards(){
    let numberCards = parseInt(prompt("Com quantas cartas você quer jogar?"));
    while(!(typeof(numberCards)== "number" && numberCards >= 4 && numberCards <= 14 && numberCards % 2 === 0)){
        numberCards = parseInt(prompt("Entrada Inválida\nA quantidade de cartas é um número par entre 4 e 14.", "Digite a quantidade de cartas..."));
    }

    let numberPairs = numberCards/2;
    let vectorImgsBack = getBackCards(numberPairs); /* lista de [str, cardPair] */

    let lineCards1 = document.querySelector(".card-line1");
    for(let i = 0; i< numberPairs; ++i){
        lineCards1.innerHTML += createCard(vectorImgsBack[i]);
    }
    
    let lineCards2 = document.querySelector(".card-line2");
    for(let i = numberPairs; i< numberCards; ++i){
        lineCards2.innerHTML += createCard(vectorImgsBack[i]);
    }
}
function getBackCards(numberPairs){
    let vectorImgsBack = [];
    let vectorIndexBack = [];
    for(let i = 0; i<numberPairs; ++i){
        vectorIndexBack.push(i);
        vectorIndexBack.push(i);
    }
    vectorIndexBack.sort(randomizeNumberArray);
    vectorIndexBack.sort(randomizeNumberArray);

    for(let i = 0; i<2*numberPairs; ++i){
        let strImg = `./img/back${vectorIndexBack[i]}.gif`;
        let cardPair = 0;
        for(let j = 0; j < 2* numberPairs; ++j){
            if(vectorIndexBack[j] == vectorIndexBack[i] && j != i){
                cardPair = j;
            }
        }
        let infoImg = [strImg, cardPair, i];
        vectorImgsBack.push(infoImg);
    }
    return vectorImgsBack;
}


function createCard(infoImg){
    let cardLine = `<div class="card" onClick="playRound(this, ${infoImg[1]}, ${infoImg[2]})">
                            <div class="card-game">
                                <img src="img/front.png" class="img-front-card">
                            </div>
                            <div class="card-game back">
                                <img src=${infoImg[0]} class="img-front-card">
                            </div>
                        </div>`;
    return cardLine;
}

function playRound(obj, cardPairNumber, thisCardNumber){
    selectCard(obj);
    if (!oneCardOpen){
        oneCardOpen = true;
        firstCardSelected = obj;
        openPairNumber = cardPairNumber;
        return;
    }
    oneCardOpen = false;
    if(thisCardNumber === openPairNumber){
        numberRounds = numberRounds + 1;
        return;
    }
    else{
        setTimeout(()=>{
            unselectCard(obj.children);
            unselectCard(firstCardSelected.children);
        }, 1000);
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

function unselectCard(objChildren){
    if(objChildren[0].classList.contains("front")){
        objChildren[0].classList.remove("front");
    }
    if(objChildren[1].classList.contains("back-onClick")){
        objChildren[1].classList.remove("back-onClick");
    }
    objChildren[1].classList.add("back");
}
function randomizeNumberArray(){
    return 4*(Math.random() -0.5)*(Math.random() -0.5)*(Math.random()-0.5);
}