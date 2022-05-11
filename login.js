var input = document.querySelector(".mail");
var input2 = document.querySelector(".motdepasse");

input.onclick = function() {
    var tl = TweenMax.to(".enveloppe", {opacity:0, display:"none"});

    tl.input();
}

input2.onclick = function() {
    var tl2 = TweenMax.to(".cadenas", {opacity:0, display:"none"});

    tl2.input2();
}