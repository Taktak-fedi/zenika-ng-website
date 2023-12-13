import { CurrencyPipe, NgFor, NgIf } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppRoutingModule } from '../app-routing.module';
import { Product } from '../catalog/product/product.types';
import { ApiService } from '../shared/services/api.service';
import { PRODUCT_DETAILS_PARAM_KEY } from './product-details.config';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [NgIf, NgFor, AppRoutingModule, CurrencyPipe],
  templateUrl: './product-details.component.html',
})
export class ProductDetailsComponent implements OnInit {
  protected product?: Product;

  private apiService = inject(ApiService);

  private activatedRoute = inject(ActivatedRoute);

  ngOnInit(): void {
    this.apiService
      .getProduct(this.activatedRoute.snapshot.params[PRODUCT_DETAILS_PARAM_KEY])
      .subscribe((product) => (this.product = product));
  }
}
