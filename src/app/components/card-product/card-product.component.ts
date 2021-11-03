import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { Global } from 'src/app/services/global';

@Component({
  selector: 'card-product',
  templateUrl: './card-product.component.html',
  styleUrls: ['./card-product.component.css']
})
export class CardProductComponent implements OnInit {
  @Input() product: Product = new Product('','','','',0,false,0,'','');
  public url:string = Global.url;
  constructor() { }

  ngOnInit(): void {
  }

}
