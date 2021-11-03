import { Component } from '@angular/core';
import { Item } from './models/item';
import { authService } from './services/auth.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'FunkoPopStore';
  public access: boolean = false
  public trolley: Array<Item> = [];
  constructor(
    private _authService: authService
  ) {}
  ngDoCheck() {
    this.access = this._authService.loggedIn()
    var aux:any;
    aux = sessionStorage.getItem('trolley');
    this.trolley = JSON.parse(aux);
  }
  ngOnInit() {
    alert("La funcion de subir y editar imagen no funciona debido a que el host gratuito que utilizo para montar la api no permite la carga de archivos. \n\nLas imagene fueron subidas mediando la api de forma local, para ver el codigo de subida de imagenes ingresar al repositorio: \n\nhttps://github.com/TomasReinhardt/api-rest-funkopop.git")
    if(sessionStorage.getItem('trolley') == null){
      sessionStorage.setItem('trolley',  JSON.stringify(this.trolley));
    }else {
      var aux:any;
      aux = sessionStorage.getItem('trolley');
      this.trolley = JSON.parse(aux);
    }
  }
  botonCategorias(){
    $('#menu-categorias').slideToggle();   
  }
  botonCategoria(){
    $('#menu-categorias').slideUp();
    if(screen.width <= 1000){
      $('#menu-dezplegable').slideToggle();   
    }
  }
  botonLogin(){
    $('.login').slideToggle(); 
    $('#menu-categorias').slideUp();
    if(screen.width <= 1000){
      $('#menu-dezplegable').slideToggle();   
    }
  }
  botonDezplegable(){
    $('#menu-dezplegable').slideToggle();   
  }
}
