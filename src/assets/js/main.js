$(document).ready(function (){
    var menuDezplegable = $('#menu-dezplegable')
    var menuCategorias = $('#menu-categorias')

    $(window).resize(function(){
        if(screen.width > 1000){
            menuDezplegable.css('display','inline-block')
        }
        if(screen.width <= 1000){
            menuDezplegable.css('display','none')
            menuCategorias.css('display','none')
        }
    })
})