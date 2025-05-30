import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private cart: any[] = [];
  constructor(private http: HttpClient) { }

  Getproducts() {
    return this.http.get<any>('/products/products');
  }

  getCart() {
    return this.cart;
  }
  addToCart(product: any) {
    const existing = this.cart.find(item => item.id === product.id);
    if (existing) {
      existing.quantity += 1;
    } else {
      this.cart.push({ ...product, quantity: 1 });
    }
  }

  removeFromCart(productId: number) {
    this.cart = this.cart.filter(item => item.id !== productId);
  }
}
