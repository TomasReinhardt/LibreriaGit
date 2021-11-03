import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { Global } from "./global";
import { Product } from "../models/product";

@Injectable()
export class ProductService {
    public url:string;

    constructor(
        public _http: HttpClient
    ){
        this.url = Global.url;
    }

    getPruduct(id: string):Observable<any> {
        let headers = new HttpHeaders().set('Content-Type','application/json');
        return this._http.get(this.url+'product/'+id, {headers: headers});
    }
    getProducts(category: string):Observable<any> {
        let headers = new HttpHeaders().set('Content-Type','application/json');
        return this._http.get(this.url+'product/category/'+category, {headers: headers});
    }
    saveProduct(product: Product):Observable<any>{
        var params = JSON.stringify(product);
        let headers = new HttpHeaders().set('Content-Type','application/json');
        return this._http.post(this.url+'product/addProduct',params,{headers: headers});
    }
    updateProduct(product: Product):Observable<any> {
        var params = JSON.stringify(product);
        let headers = new HttpHeaders().set('Content-Type','application/json');
        return this._http.put(this.url+'product/updateProduct/'+product._id,params,{headers: headers});
    }
    deleteProduct(id: string):Observable<any> {
        let headers = new HttpHeaders().set('Content-Type','application/json');
        return this._http.delete(this.url+'product/'+id, {headers: headers});

    }
}