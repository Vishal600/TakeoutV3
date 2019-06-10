import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cart: any;
  constructor(private data: DataService, private toastr: ToastrService) {}

  ngOnInit() {
    this.data.getCart().subscribe(d => {
      this.cart = d;
    });
  }

  update(event, id) {
    const cart = JSON.parse(localStorage.getItem('cart'));
    for (const c of cart) {
      if (c.id === id) {
        c.count = event.target.value;
      }
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    this.data.getCart().subscribe(d => {
      this.cart = d;
    });
  }

  delete(id) {
    const cart = JSON.parse(localStorage.getItem('cart'));
    const result = cart.filter(c => c.id !== id);
    localStorage.setItem('cart', JSON.stringify(result));
    this.data.getCart().subscribe(d => {
      this.cart = d;
    });
  }

  checkout() {
    this.data.checkout().subscribe((d: any) => {
      localStorage.removeItem('cart');
      this.cart = null;
      this.toastr.success(
        'please pay at the POS counter',
        `OrderNo : ${d.OrderNo} |  Total : ${d.GTotal}`
      );
    });
  }
}
