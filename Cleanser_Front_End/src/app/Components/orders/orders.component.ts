import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { ProductService } from '../../Services/product.service';
import { Router } from '@angular/router';

@Component({ 
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  @Output() addToCart: EventEmitter<[]> = new EventEmitter;

  public mensP = [];
  womenP = [];
  girlsP = [];
  boysP = [];
  bedsP = [];
  counter = 0;
  // showBtn = false;
  constructor(private productService: ProductService, private router: Router) { }

  ngOnInit() {
    // Subscribe to Observables
    this.productService.getMensProduct().subscribe(
      res => this.mensP = res,
      err => console.log(err)
    )

    this.productService.getWomensProduct().subscribe(
      res => this.womenP = res,
      err => console.log(err)
    )

    this.productService.getGirlsProduct().subscribe(
      res => this.girlsP = res,
      err => console.log(err)
    )

    this.productService.getBoysProduct().subscribe(
      res => this.boysP = res,
      err => console.log(err)
    )

    this.productService.getBedsProduct().subscribe(
      res => this.bedsP = res,
      err => console.log(err)
    )
  }

  // + and - functions for all buttons

  // Add and Remove the value for mens Products
  addMenNumber(itemIndex) {
    this.mensP[itemIndex].value +=1;
    console.log(this.mensP[itemIndex].value * this.mensP[itemIndex].price);
    this.counter += 1;
    console.log(this.mensP);
    // this.addToCart.emit(this.mensP[itemIndex]);
  } 

  removeMenNumber(itemIndex) {
    if(this.mensP[itemIndex].value === 0) {
      this.mensP[itemIndex].value === 0;
    } else {
      this.mensP[itemIndex].value -=1;
      console.log(this.mensP[itemIndex].value * this.mensP[itemIndex].price);
      this.counter -= 1;
    }
  }

  // Add and Remove the value for Women's Products
  addWomenNumber(itemIndex) {
    this.womenP[itemIndex].value +=1;
    console.log(this.womenP[itemIndex].value * this.womenP[itemIndex].price);
    this.counter += 1;
  } 

  removeWomenNumber(itemIndex) {
    if(this.womenP[itemIndex].value === 0) {                 
      this.womenP[itemIndex].value === 0;
    } else {
      this.womenP[itemIndex].value -=1;
      console.log(this.womenP[itemIndex].value * this.womenP[itemIndex].price);
      this.counter -= 1;
    }
  }

  // Add and Remove the value for girls's Products
  addGirlNumber(itemIndex) {
    this.girlsP[itemIndex].value +=1;
    console.log(this.girlsP[itemIndex].value * this.girlsP[itemIndex].price);
    this.counter += 1;
  } 

  removeGirlNumber(itemIndex) {
    if(this.girlsP[itemIndex].value === 0) {
      this.girlsP[itemIndex].value === 0;
    } else {
      this.girlsP[itemIndex].value -=1;
      console.log(this.girlsP[itemIndex].value * this.girlsP[itemIndex].price);
      this.counter -= 1;
    }
  }

  // Add and Remove the value for Boy's Products
  addBoyNumber(itemIndex) {
    this.boysP[itemIndex].value +=1;
    console.log(this.boysP[itemIndex].value * this.boysP[itemIndex].price);
    this.counter += 1;
  } 

  removeBoyNumber(itemIndex) {
    if(this.boysP[itemIndex].value === 0) {
      this.boysP[itemIndex].value === 0;
    } else {
      this.boysP[itemIndex].value -=1;
      console.log(this.boysP[itemIndex].value * this.boysP[itemIndex].price);
      this.counter -= 1;
    }
  }

  // Add and Remove the value for Bed's Products
  addBedNumber(itemIndex) {
    this.bedsP[itemIndex].value +=1;
    console.log(this.bedsP[itemIndex].value * this.bedsP[itemIndex].price);
    this.counter += 1;
  } 

  removeBedNumber(itemIndex) {
    if(this.bedsP[itemIndex].value === 0) {
      this.bedsP[itemIndex].value === 0;
    } else {
      this.bedsP[itemIndex].value -=1;
      console.log(this.bedsP[itemIndex].value * this.bedsP[itemIndex].price);
      this.counter += 1;
    }
  }







  // show "-" btn when user clicks "+" button for the first time
  // show() {
  //   this.showBtn = true;
  // }

  // hide "-" button when number reaches 0
  // hide() {
  //   if(this.counter === 0) {
  //     this.showBtn = false;
  //   }
  // }
}
