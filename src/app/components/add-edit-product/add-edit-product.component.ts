import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product';
import { authService } from 'src/app/services/auth.service';
import { Global } from 'src/app/services/global';
import { ProductService } from 'src/app/services/produtc.service';
import { UploadService } from 'src/app/services/upload.service';

@Component({
  selector: 'add-edit-product',
  templateUrl: './add-edit-product.component.html',
  styleUrls: ['./add-edit-product.component.css'],
  providers: [ProductService, UploadService]
})
export class AddEditProductComponent implements OnInit {
  public product: Product = new Product('','','','',0,false,0,'','');
  public filesToUpload: Array<File> = [];
  public url:string = Global.url;
  
  constructor(
    private _productService: ProductService,
    private _UploadService: UploadService,
    private _AuthService: authService,
    private _router: Router
    ) { }

  ngOnInit(): void {
  }

  ngDoCheck(){
    if(!this._AuthService.loggedIn()){
      this._router.navigate(['products','all'])
    }
  }
  saveProduct(form:any){
    this._productService.saveProduct(this.product).subscribe(
      response =>{
        if(this.filesToUpload.length >= 1){
          this._UploadService.makeFileRequest(Global.url+'product/upload-image/'+response.product._id,[],this.filesToUpload,'image')
        }
        alert("Producto Cargado");
        form.reset();
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
