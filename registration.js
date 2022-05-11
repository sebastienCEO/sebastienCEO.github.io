var input = document.querySelector(".name");
var input2 = document.querySelector(".mail");
var input3 = document.querySelector(".motdepasse");
var input4 = document.querySelector(".motdepasseconfirm");

input.onclick = function() {
    var tl = TweenMax.to(".profil", {opacity:0, display:"none"});

    tl.input();
}

input2.onclick = function() {
    var tl2 = TweenMax.to(".enveloppe", {opacity:0, display:"none"});

    tl2.input2();
}

input3.onclick = function() {
    var tl3 = TweenMax.to(".cadenas", {opacity:0, display:"none"});

    tl3.input3();
}

input4.onclick = function() {
    var tl4 = TweenMax.to(".cadenas2", {opacity:0, display:"none"});

    tl4.input4();
}