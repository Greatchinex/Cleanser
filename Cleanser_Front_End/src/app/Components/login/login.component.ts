import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material';
import { AuthService } from '../../Services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  mainForm: FormGroup;
  email: string = "";
  password: string = "";
  hide = true; // for Visibility icon on password input field

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) { 
    this.mainForm = this.fb.group({
      "email": ["", Validators.compose([Validators.required, Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)])],
      "password": ["", Validators.compose([Validators.required, Validators.minLength(8), Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')])]
    });   
  }

  ngOnInit() {
  }

  // On Login
  onLoginSubmit(mainForm) {
    // console.log(this.mainForm.value);

    // Authenticate a User
    this.authService.authenticateUser(mainForm.value).subscribe((data:any) => {
      console.log(data);

      if(data.success) {
        // Store the user data
        this.authService.storeUserData(data.token, data.user);
        alert("You are now logged in");
        this.router.navigate(["/orders"]);
      } else {
        alert(data.message);
        this.router.navigate(["/login"]);
      }
    })

    // this.authService.authenticateUser(mainForm.value).subscribe(
    //   res => {
    //     console.log(res);
    //     this.authService.storeUserData(res.token, res.user);
    //     alert("You are now logged in");
    //     this.router.navigate(["/orders"]);
    //   },
    //   err => {
    //     console.log(err);
    //     alert(err);
    //     this.router.navigate(["/login"]);
    //   }
    // )
  }
}