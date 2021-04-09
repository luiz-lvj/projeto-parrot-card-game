function selectCard(obj){
    let obj_c = obj.children;
    console.log(obj_c);
    obj_c[0].classList.add("front");
    obj_c[1].classList.add("back-onClick");
    obj_c[1].classList.remove("back");
    console.log(obj_c[0]);
    console.log(obj_c[1]);
}