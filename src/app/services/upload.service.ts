import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders} from "@angular/common/http";
import { Global } from "./global";
import { Observable } from "rxjs";

@Injectable()
export class UploadService {
    public url: string = Global.url;

    constructor( 
        private _http: HttpClient
    ){}

    uploadImage(vals:any): Observable<any> {
        let data = vals;
        return this._http.post(
          'https://api.cloudinary.com/v1_1/dvq0ezqjl/auto/upload',data
        );
    }
}