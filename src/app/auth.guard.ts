import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { authService } from './services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private _authService: authService,
    private _router: Router
  ){}

  canActivate():boolean {
    if(this._authService.loggedIn()) return true
    else {
      this._router.navigate(['/']);
      return false;
    }
  }
  
}
