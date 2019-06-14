import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../Services/auth.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  mainForm: FormGroup;
  firstName: string = "";
  lastName: string = "";
  email: string = "";
  password: string = "";
  phone= "";
  hide = true; // for Visibility icon on password input field


  constructor(
    private fb: FormBuilder, 
    private authService: AuthService, 
    private router: Router,
    private flashMessages: FlashMessagesService) { 
    this.mainForm = this.fb.group({
      "firstName": ["", Validators.compose([Validators.required, Validators.pattern('^\s*[a-zA-Z,\s]+\s*$')])],
      "lastName": ["", Validators.compose([Validators.required, Validators.pattern('^\s*[a-zA-Z,\s]+\s*$')])],
      "email": ["", Validators.compose([Validators.required, Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)])],
      "password": ["", Validators.compose([Validators.required, Validators.minLength(8), Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')])],
      "phone": ["", Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(10)])]
    });   
  }

  ngOnInit() {
  }

  // On Form Submit
  onRegisterSubmit(mainForm) {
    // console.log(this.mainForm.value);

    // Register a user
    this.authService.registerUser(mainForm.value).subscribe((data:any) => {
      if(data.success) {
        alert("You are Now registered and can Login");
        this.router.navigate(["/login"]);
      } else {
        alert("Something Went Wrong Please Try Again");
        this.router.navigate(["/register"]);
      }
    })

    // this.authService.registerUser(user)
    // .subscribe(
    //   res => console.log(res),
    //   err => console.log(err)
    // )
  }
}
