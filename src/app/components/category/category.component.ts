import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/produtc.service';

@Component({
  selector: 'category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
  providers: [ProductService]
})
export class CategoryComponent implements OnInit {
  public title:any = "";
  public Products: Product[] = [];
  public nameSearch: string = "";
  public nameSearchM: string = "";
  public category:any = "";
  public orden:any = "az";
  constructor(
    private _route: ActivatedRoute,
    private _prodcutService: ProductService,
    private _router: Router
  ) { }

  ngOnInit(): void {
    this._route.paramMap.subscribe((params: ParamMap) => {
      if(params.get('category') == "all"){
        this.title = "Productos";
      }else {
        this.title =  params.get('category');
      }
      this.category = params.get('category');
      this.getProducts();
    });
  }

  ngDoCheck() {
    this.nameSearch = this.nameSearchM.toLowerCase();
    this.ordenarArray()
  }

  getProducts() {
    this._prodcutService.getProducts(this.category).subscribe(
      response => {
        this.Products = response.product;
        if(this.Products.length < 1){
          this._router.navigate(['error']);
        }
      },
      err => {
        console.log(err);
        this._router.navigate(['error']);
      }
    )
  }

  ordenarArray(){
    if (this.orden == "mp"){
      this.Products.sort( (a:any, b:any)=> a.price - b.price )
    }
    else if (this.orden == "Mp"){
      this.Products.sort( (a:any, b:any)=> b.price - a.price )
    }
    else if (this.orden == "az"){
      this.Products.sort( (a, b) => {
        if(a.name < b.name) return -1;
        if(a.name > b.name) return 1;
        return 0;
      })
    }
    else if (this.orden == "za"){    
      this.Products.sort( (a, b) => {
        if(a.name < b.name) return 1;
        if(a.name > b.name) return -1;
        return 0;
      })
    }
  }
}
