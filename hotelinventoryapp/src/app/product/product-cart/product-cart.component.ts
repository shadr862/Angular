import { Component } from '@angular/core';
import { ProductsService } from '../service/products.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'hinv-product-cart',
  imports: [CommonModule],
  templateUrl: './product-cart.component.html',
  styleUrl: './product-cart.component.scss'
})
export class ProductCartComponent {

  cart: any[] = [];

  constructor(private cartService: ProductsService) {}

  ngOnInit() {
    this.cart = this.cartService.getCart();
  }

  removeFromCart(productId: number) {
    this.cartService.removeFromCart(productId);
    this.cart = this.cartService.getCart();
  }

  getTotalPrice(): number {
  return this.cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

}
