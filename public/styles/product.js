document.addEventListener("DOMContentLoaded",function(){
    var bar = document.getElementsByClassName('bar');
    var close = document.getElementsByClassName('close');
    close=close[0];
    var menu = document.getElementsByClassName('menu-mobile');
    bar=bar[0];
    menu=menu[0];
    bar.onclick = function(){
        menu.classList.toggle('dichchuyen');
        
    }
    close.onclick =function(){
        console.log("ban vua click");
        menu.classList.remove('dichchuyen');
    }
},false)