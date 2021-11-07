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
    // makeFileRequest(url:string, params: Array<string>, files: Array<File>, name: string) {
    //     return new Promise( function(resolver,reject) {
    //         var formData:any = new FormData();
    //         var xhr = new XMLHttpRequest();

    //         for(var i=0; i<files.length;i++){
    //             formData.append(name, files[i], files[i].name);
    //         }

    //         xhr.onreadystatechange = function (){
    //             if(xhr.readyState == 4){
                    
    //                 if(xhr.status == 200){
    //                     resolver(JSON.parse(xhr.response));
    //                 }else {
    //                     reject(xhr.response);
    //                 }
    //             }
    //         }

    //         xhr.open('POST',url, true);
    //         xhr.send(formData);
    //     });
    // }
}