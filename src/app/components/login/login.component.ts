import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { authService } from 'src/app/services/auth.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public access: boolean = false
  public errorC: boolean = false
  public username:any = {
    email: "",
    password: ""
  }
  constructor(
    private _authService: authService,
    private _router: Router
  ) { }

  ngOnInit(): void {
    
  }

  ngDoCheck() {
    this.access = this._authService.loggedIn()
  }
  checkUser(form:any){
    this._authService.singUp(this.username).subscribe(
      response => {
        localStorage.setItem('token', response.token)
        this.access = true
        this.errorC = false;
        form.reset();
        $('.login').slideToggle(); 
      },
      err => {
        console.log(err)
        this.errorC = true;
      }
    )
  }

  logOut(){
    this._authService.logOut()
    this.access = false;
  }
}
