import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/produtc.service';
import { Global } from 'src/app/services/global';
import { Router,ActivatedRoute,Params } from '@angular/router';
import { UploadService } from 'src/app/services/upload.service';
import { authService } from 'src/app/services/auth.service';

@Component({
  selector: 'edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css'],
  providers: [ProductService,UploadService]
})
export class EditProductComponent implements OnInit {
  public product: Product = new Product('','','','',0,false,0,'','');
  public url: string = Global.url;
  public cantidad:number = 0;
  public stock:string = "";
  public filesToUpload: Array<File> = [];

  constructor(
    public _productService: ProductService,
    private _UploadService: UploadService,
    public _router: Router,
    public _route: ActivatedRoute,
    private _AuthService: authService
  ) { }

  ngOnInit(): void {
    this._route.params.subscribe(params => {
      let id = params.id;
      this.getProduct(id);
    });
  }

  ngDoCheck(){
    if(!this._AuthService.loggedIn()){
      this._router.navigate(['products','all'])
    }
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
      }
    )
  }

  saveProduct(form:any){
    this._productService.updateProduct(this.product).subscribe(
      response => {
        if(this.filesToUpload.length >= 1){
          this._UploadService.makeFileRequest(Global.url+'product/upload-image/'+response.product._id,[],this.filesToUpload,'image')
        }
        this._router.navigate(['product',this.product._id])
      },
      err => {
        console.log(err);
      }
    )
  }

  deleteProduct(id:string){
    this._productService.deleteProduct(id).subscribe(
      response => {
        if(response.product){
          this._router.navigate(['products','all']);
        }
      },
      err => {
        console.log(err);
      }
    )
  }

  fileChangeEvent(fileInput: any) {
    this.filesToUpload = <Array<File>>fileInput.target.files;
  }

}
