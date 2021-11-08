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
  files: File[] = [];
  public loading:boolean = false;

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

  saveProduct(form:any, image:string){
    this.product.image = image;

    this._productService.updateProduct(this.product).subscribe(
      response => {
        this.loading = false;
        this._router.navigate(['product',this.product._id])
      },
      err => {
        console.log(err);
      }
    )
  }

  uploadImage(form:any){
    this.loading = true;

    if(this.files.length >= 1){
      const file_data = this.files[0];
      const data = new FormData();
      data.append('file', file_data);
      data.append('upload_preset', 'libreria_cloudinary');
      data.append('cloud_name', 'dvq0ezqjl');

      this._UploadService.uploadImage(data).subscribe(
        response => {
          var aux = "https://res.cloudinary.com/dvq0ezqjl/image/upload/c_scale,h_640,w_640/v"+response.version+"/"+response.public_id+"."+response.format;
          this.saveProduct(form,aux);
        },
        err => {
          console.log(err);
        }
      )
    }else {
      this.saveProduct(form,this.product.image);
    }
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

  onSelect(event:any) {
    var filesAux = []
    filesAux.push(...event.addedFiles);
    if (filesAux[0].type != "image/jpeg" && filesAux[0].type != "image/png" && filesAux[0].type != "image/jpg"){
      filesAux.splice(this.files.indexOf(event), 1);
      alert('Tipo de archivo no soportado')
    }else {
      this.files = [];
      this.files = filesAux;
    }    
  }

  onRemove(event:any) {
    this.files.splice(this.files.indexOf(event), 1);
  }
}
