function dealCards(){
    let number_cards = parseInt(prompt("Com quantas cartas você quer jogar?"));
    while(!(typeof(number_cards)== "number" && number_cards >= 4 && number_cards <= 14 && number_cards % 2 === 0)){
        number_cards = parseInt(prompt("Entrada Inválida\nA quantidade de cartas é um número par entre 4 e 14.", "Digite a quantidade de cartas..."));
    }
    console.log(number_cards)
}
dealCards();

function selectCard(obj){
    let obj_c = obj.children;
    console.log(obj_c);
    obj_c[0].classList.add("front");
    obj_c[1].classList.add("back-onClick");
    if(obj_c[1].classList.contains("back")){
        obj_c[1].classList.remove("back");
    }
    setTimeout(()=>{unselectCard(obj_c)}, 2000);
    console.log(obj_c[0]);
    console.log(obj_c[1]);
}

function unselectCard(obj_c){
    if(obj_c[0].classList.contains("front")){
        obj_c[0].classList.remove("front");
    }
    if(obj_c[1].classList.contains("back-onClick")){
        obj_c[1].classList.remove("back-onClick");
    }
    obj_c[1].classList.add("back");
}