import { Injectable } from '@angular/core';
import { OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// import 'rxjs/add/operator/map';
import { map } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authToken: any;
  user: any;

  private jwtHelper = new JwtHelperService();
  /* private jwtHelper = new JwtHelperService(); I did not inject it inside the constructor because there 
  is a bug in the JwtHelperService that prevents it from working when injected inside the constructor.*/
  constructor(private http: HttpClient) { }

  // ngOnInit() {
  //   // Checking if we are logged in an token is not expired
  //   // console.log(this.jwtHelper.isTokenExpired()); // true or false
  // }

  // Register User
  registerUser(user) {
    // Set Headers
    let headers = new HttpHeaders();
    headers.append("Content-Type", "application/json");
    // Make Request To Back-End Api
    return this.http.post<any>("http://localhost:3000/users/register", user, {headers:headers})
    // .pipe(map((res: Response) => res.json()));     
  }

  // Authenticate user
  authenticateUser(user) {
    // Set Headers
    let headers = new HttpHeaders();
    headers.append("Content-Type", "application/json");
    // Make Request To Back-End Api
    return this.http.post<any>("http://localhost:3000/users/authenticate", user, {headers:headers})
  }

  // Get User Profile
  getProfile() {
    // Set Headers
    let headers = new HttpHeaders();
    this.loadToken(); // Also a header
    headers.append('Access-Control-Allow-Origin', "*");
    headers.append('Access-Control-Allow-Headers', 'Content-Type');
    headers.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    headers.append("Authorization", this.authToken) // Sending the token value as a header in the Authorization type
    headers.append("Content-Type", "application/json");
    // Make Request To Back-End Api
    return this.http.get("http://localhost:3000/users/profile", {headers:headers})
  }

  // Store user data in local storage
  storeUserData(token, user) {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user)); // JSON.stringify is because local storage can only store a string while JSON is an object so we have to convert the JSON to a string first before saving it in local storage
    this.authToken = token;
    this.user = user;
  }

  // Get token from local storage to store in the profile headers
  loadToken() {
    const token = localStorage.getItem("token");
    this.authToken = token;
    // return localStorage.getItem("id_token");
  }

  //Method to check if token exists in local storage
  // loggedin() {
  //   return !!localStorage.getItem("id_token"); // !! is because i want the token to return a Boolean(true/false) and not the token itself
  // }

  // Check if user is logged in
  public isAuthenticated(): boolean {

    const token = localStorage.getItem('token');

    // Check whether the token is expired and return
    // true or false
    return !this.jwtHelper.isTokenExpired(token);
  }

  // Logout
  logout() {
    this.authToken = null;
    this.user = null;
    localStorage.clear()
  }
  
}

