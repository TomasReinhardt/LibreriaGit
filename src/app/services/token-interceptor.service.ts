import { Injectable } from "@angular/core";
import { HttpInterceptor } from "@angular/common/http";
import { authService } from "./auth.service";
@Injectable({
    providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor{

    constructor(
        private _authService: authService
    ){}

    intercept(req:any,next:any){

        const re = "/api.cloudinary.com"
        if ( req.url.search(re) ===  -1){
            req = req.clone({
                setHeaders: {
                    Authorization: `Bearer ${this._authService.getToken()}`
                }
            })
        }
        return next.handle(req);
    }    
}