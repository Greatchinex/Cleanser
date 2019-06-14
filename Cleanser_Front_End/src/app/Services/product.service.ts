import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  // Get men's product from Api
  getMensProduct() {
    return this.http.get<any>("http://localhost:3000/products/men");
  }

  // Get women's product from Api
  getWomensProduct() {
    return this.http.get<any>("http://localhost:3000/products/women");
  }

  // Get girls's product from Api
  getGirlsProduct() {
    return this.http.get<any>("http://localhost:3000/products/girls");
  }

  // Get men's product from Api
  getBoysProduct() {
    return this.http.get<any>("http://localhost:3000/products/boys");
  }

  // Get men's product from Api
  getBedsProduct() {
    return this.http.get<any>("http://localhost:3000/products/beddings");
  }
}
