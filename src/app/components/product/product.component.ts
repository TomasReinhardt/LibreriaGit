import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/produtc.service';
import { Global } from 'src/app/services/global';
import { Router,ActivatedRoute,Params } from '@angular/router';
import { authService } from 'src/app/services/auth.service';
import { Item } from 'src/app/models/item';
@Component({
  selector: 'product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
  providers: [ProductService]
})
export class ProductComponent implements OnInit {
  public product: Product = new Product('','','','',0,false,0,'','');
  public url: string = Global.url;
  public cantidad:number = 1;
  public stock:string = "";
  public access: boolean = false
  public trolley: Array<Item> = [];

  constructor(
    public _productService: ProductService,
    public _router: Router,
    public _route: ActivatedRoute,
    private _authService: authService
  ) { }

  ngOnInit(): void {
    this._route.params.subscribe(params => {
      let id = params.id;
      this.getProduct(id);
    });
  }

  ngDoCheck() {
    this.access = this._authService.loggedIn()
  }

  getProduct(id:string){
    this._productService.getPruduct(id).subscribe(
      response => {
        if(response.product){
          this.product = response.product;
          if(this.product.stock == true){
            this.stock = "Si"
          }else {
            this.stock = "No"
          }
        };
      },
      err => {
        console.log(err);
        this._router.navigate(['error']);
      }
    )
  }

  addTrolley(){
    var aux:any;
    aux = localStorage.getItem('trolley');
    this.trolley = JSON.parse(aux);

    var item: Item = {
      product: this.product,
      cant: this.cantidad
    }

    if(this.trolley.length == 0){
      this.trolley.push(item)
    }else {
      var encontrado = false;
      for (let i = 0; i < this.trolley.length; i++) {
        if(this.trolley[i].product._id == item.product._id){
          this.trolley[i].cant += item.cant
          encontrado = true;
          break
        }
      }
      if(!encontrado){
        this.trolley.push(item)
      }
    }
    localStorage.setItem('trolley',  JSON.stringify(this.trolley))
  }

}
