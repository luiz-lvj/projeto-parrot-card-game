dealCards();
function dealCards(){
    let numberCards = parseInt(prompt("Com quantas cartas você quer jogar?"));
    while(!(typeof(numberCards)== "number" && numberCards >= 4 && numberCards <= 14 && numberCards % 2 === 0)){
        numberCards = parseInt(prompt("Entrada Inválida\nA quantidade de cartas é um número par entre 4 e 14.", "Digite a quantidade de cartas..."));
    }

    lineCards = document.querySelector(".card-line1");
    for(let i = 0; i< numberCards; ++i){
        lineCards.innerHTML += createCard();
    }
}
function createCard(){
    let cardLine = `<div class="card" onClick="selectCard(this)">
                            <div class="card-game">
                                <img src="img/front.png" class="img-front-card">
                            </div>
                            <div class="card-game back">
                                <h1>:)</h1>
                            </div>
                        </div>`;
    return cardLine;
}

function selectCard(obj){
    let objChildren = obj.children;
    console.log(objChildren);
    objChildren[0].classList.add("front");
    objChildren[1].classList.add("back-onClick");
    if(objChildren[1].classList.contains("back")){
        objChildren[1].classList.remove("back");
    }
    setTimeout(()=>{unselectCard(objChildren)}, 2000);
    console.log(objChildren[0]);
    console.log(objChildren[1]);
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