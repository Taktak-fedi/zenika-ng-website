import { NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from '../app-routing.module';
import { BasketService } from '../basket/basket.service';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [NgIf, AppRoutingModule, BrowserModule],
  templateUrl: './menu.component.html',
})
export class MenuComponent {
  private basketService = inject(BasketService);

  protected get numberOfItems() {
    return this.basketService.numberOfItems;
  }
}
