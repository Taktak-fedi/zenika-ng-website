import { Component, Inject } from '@angular/core';
import { BasketItem } from '../basket/basket.types';
import { Product } from '../product/product.types';
import { ApiService } from '../shared/services/api.service';
import { CatalogService } from './catalog.service';
import { BasketService } from '../basket/basket.service';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
})
export class CatalogComponent {
  protected get products(): Product[] {
    return this.catalogService.items;
  }

  protected get basketItems(): BasketItem[] {
    return this.bascketService.items;
  }

  constructor(
    @Inject('WELCOME_MSG') protected welcomeMsg: string,
    private apiService: ApiService,
    private catalogService :CatalogService,
    private bascketService : BasketService,
  ) {
    this.catalogService.fetch().subscribe();
    this.bascketService.fetch().subscribe();
  }

  protected get basketTotal(): number {
    return this.basketItems.reduce((total: number, { price }) => total + price, 0);
  }

  protected addToBasket(product: Product): void {
    this.bascketService.addItem(product.id).subscribe(() => {
      this.decreaseStock(product);
    });
  }

  private decreaseStock(product: Product): void {
    product.stock -= 1;
  }

  protected isAvailable(product: Product): boolean {
    return product.stock !== 0;
  }

  protected get isStockEmpty(): boolean {
    return this.products.every(({ stock }) => stock === 0);
  }
}
