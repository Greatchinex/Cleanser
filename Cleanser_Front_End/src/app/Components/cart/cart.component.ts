import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { OrdersComponent  } from '../orders/orders.component';
import { ProductService } from '../../Services/product.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  @Input() public mensP = [];
  constructor() { }

  ngOnInit() {
  }

  addToCart(itemIndex) {
    this.mensP[itemIndex]
    console.log("Item Was Added");
  }
}
