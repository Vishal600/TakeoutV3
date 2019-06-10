/*Service for the Menu*/

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// url
const url = 'http://localhost:64608/api/';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private http: HttpClient) {}

  getMenu() {
    return this.http.get(`${url}Items`);
  }

  getMenuByItemType(id) {
    return this.http.get(`${url}Items/${id}`);
  }

  getItemTypes() {
    return this.http.get(`${url}ItemTypes`);
  }

  addItem(item) {
    return this.http.post(`${url}items`, item);
  }

  deleteItem(id) {
    return this.http.delete(`${url}items/${id}`);
  }

  getCart() {
    return this.http.post(
      `${url}cart`,
      JSON.parse(localStorage.getItem('cart'))
    );
  }

  checkout() {
    return this.http.post(`${url}checkout`, { Checkout : JSON.parse(localStorage.getItem('cart'))});
  }
}
