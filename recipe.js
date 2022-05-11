var input = document.querySelector(".search");

input.onclick = function() {
    var tl = TweenMax.to(".loupe", {opacity:0, display:"none"});

    tl.input();
}

var icone = document.querySelector(".iconeProfil");

icone.onclick = function() {
    var tl1 = gsap.to (".profil", {duration: 1, x: 546, scaleX: 19.2, scaleY: 6});
    var tl2 = TweenLite.from(".infoProfil", 1, {autoAlpha:0, delay: 1});

    tl2.tl1.icone();
}