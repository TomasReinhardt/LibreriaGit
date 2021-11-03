$(document).ready(function (){
    var menuDezplegable = $('#menu-dezplegable')
    var menuCategorias = $('#menu-categorias')

    $(window).resize(function(){

        if(window.innerWidth > 1000){
            menuDezplegable.css('display','inline-block')
        }
        if(window.innerWidth <= 1000){
            menuDezplegable.css('display','none')
            menuCategorias.css('display','none')
        }
    })
})