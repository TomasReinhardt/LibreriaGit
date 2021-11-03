import { Component, OnInit } from '@angular/core';
import { Item } from 'src/app/models/item';

@Component({
  selector: 'trolley',
  templateUrl: './trolley.component.html',
  styleUrls: ['./trolley.component.css']
})
export class TrolleyComponent implements OnInit {
  public trolley: Array<Item> = [];
  public trolleyS: string = "";
  public name:string = "";
  public envio:boolean = false;
  public direccion: string = "";
  public aux:any;
  public total = 0;

  constructor() { }

  ngOnInit(): void {
    this.aux = sessionStorage.getItem('trolley');
    this.trolley = JSON.parse(this.aux);

    this.priceEnd();
  }

  hacerPedido(){
    this.trolleyS = '';
    this.trolleyS += 'Pedido de *'+this.name+'*%0A'
    if(this.envio){
      this.trolleyS += 'Dirección: *'+this.direccion+'*%0A'
    }
    this.trolleyS += '------------------------------------------%0A'
    for (let i = 0; i < this.trolley.length; i++) {
      var aux = '-'+this.trolley[i].product.name+' -- x'+this.trolley[i].cant+' ==> '+this.trolley[i].product.price+'%0A'
      this.trolleyS += aux;
    }
    this.trolleyS += '------------------------------------------%0AEl total del pedido es: $*'+this.total+'*'

    window.open("https://wa.me/543492649194/?text="+this.trolleyS,"_blank")
  }

  priceEnd(){
    this.total = 0;
    for (let i = 0; i < this.trolley.length; i++) {
      this.total += (this.trolley[i].product.price*this.trolley[i].cant);
    }
  }

  addCant(index:number){
    this.trolley[index].cant++
    this.priceEnd();
    sessionStorage.setItem('trolley',  JSON.stringify(this.trolley));
  }
  removeCant(index:number){
    this.trolley[index].cant--
    this.priceEnd();
    if(this.trolley[index].cant <= 0){
      this.removeItem(index);
    }else {
      sessionStorage.setItem('trolley',  JSON.stringify(this.trolley));
    }
  }
  removeItem(index:number){
    this.trolley.splice(index,1); 
    this.priceEnd();
    sessionStorage.setItem('trolley',  JSON.stringify(this.trolley));
  }
}
