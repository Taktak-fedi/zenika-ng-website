import { Component } from '@angular/core';
import { ApiService } from '../shared/services/api.service';
import { BasketService } from '../basket/basket.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
})
export class MenuComponent {
  //protected numberOfBasketItems = 0;
  protected get numberOfBasketItems(): number {
    return this.basketService.items.length;
  }

  constructor(private apiService: ApiService,  private basketService: BasketService,) {
    // For now, we have an issue: the `numberOfBasketItems` property is not reactive!
    // The property is not updated when we add a product to the bakset or after checkout...
    this.basketService.fetch().subscribe();
  }
}
