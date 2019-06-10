import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  items: any;
  itemTypes: any;
  selectedValue: any;
  cart = [];
  constructor(private data: DataService) {}

  ngOnInit() {
    this.data.getMenu().subscribe(data => {
      this.items = data;
      /*  console.log(this.items);*/
    });

    // get all item types
    this.data.getItemTypes().subscribe(data => {
      this.itemTypes = data;
    });
  }

  getItems() {
    this.data.getMenuByItemType(this.selectedValue).subscribe(data => {
      this.items = data;
    });
  }

  addToCart(itemID) {
    let cart = JSON.parse(localStorage.getItem('cart'));
    if (cart) {
      for (const c of cart) {
        if (c.id === itemID) {
          c.count = ++c.count;
        }
      }
      const result = cart.filter(c => c.id === itemID);
      if (result.length === 0) {
        cart.push({
          id: itemID,
          count: 1
        });
      }
    } else {
      cart = [];
      cart.push({
        id: itemID,
        count: 1
      });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
  }
}
