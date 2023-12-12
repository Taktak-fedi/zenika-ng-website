import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Customer } from '../customer/customer.types';
import { BasketItem } from './basket.types';
import { BasketService } from './basket.service';
import { ApiService } from '../shared/services/api.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
})
export class BasketComponent {
  protected get basketItems(): BasketItem[] {
    return this.bascketService.items;
  }


  protected customer: Customer = { name: '', address: '', creditCard: '' };

  constructor(
    private apiService: ApiService,
    private bascketService: BasketService,
    private router: Router,
  ) {
    this.bascketService.fetch().subscribe();
  }

  protected get basketTotal(): number {
    return this.basketItems.reduce((total, { price }) => total + price, 0);
  }

  protected checkout(event: Event): void {
    event.stopPropagation();
    event.preventDefault();

    this.apiService.checkoutBasket(this.customer).subscribe(() => {
      this.bascketService.items = [];
      this.router.navigate(['']);
    });
  }
}
