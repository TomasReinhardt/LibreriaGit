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
  public url:string = Global.url;
  files: File[] = [];
  
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

  saveProduct(form:any, image:string){
    this.product.image = image;

    this._productService.saveProduct(this.product).subscribe(
      response =>{
        alert("Producto Cargado");
        form.reset();
      },
      err => {
        console.log(err);
      }
    )
  }

  uploadImage(form:any){
    if(this.files.length >= 1){
      const file_data = this.files[0];
      const data = new FormData();
      data.append('file', file_data);
      data.append('upload_preset', 'libreria_cloudinary');
      data.append('cloud_name', 'dvq0ezqjl');

      this._UploadService.uploadImage(data).subscribe(
        response => {
          this.saveProduct(form,response.secure_url);
        },
        err => {
          console.log(err);
        }
      )
    }else {
      this.saveProduct(form,'');
    }
  }

  onSelect(event:any) {
    this.files.push(...event.addedFiles);
    if(this.files.length > 1){
      this.files.splice(this.files.indexOf(event), 1);
      alert ('No puede cargar mas de 1 archivo');
    }
    if (this.files[0].type != "image/jpeg" && this.files[0].type != "image/png" && this.files[0].type != "image/jpg"){
      this.files.splice(this.files.indexOf(event), 1);
      alert('Tipo de archivo no soportado')
    }
    
  }

  onRemove(event:any) {
    this.files.splice(this.files.indexOf(event), 1);
  }

}
