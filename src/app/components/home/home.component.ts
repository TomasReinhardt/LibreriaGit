import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/produtc.service';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [ProductService]
})
export class HomeComponent implements OnInit {
  public title: string = "Mis Productos"
  public Products: Product[] = [];
  public nameSearch: string = "";
  public nameSearchM: string = "";

  constructor(
    private _prodcutService: ProductService
  ) { }

  ngOnInit(): void {
    this.getProducts();
  }

  ngDoCheck() {
    this.nameSearch = this.nameSearchM.toLowerCase();
  }
  
  getProducts() {
    this._prodcutService.getProducts('all').subscribe(
      response => {
        this.Products = response.funkopop;
      },
      err => {
        console.log(err)
      }
    )
  }
}
