import { Injectable, inject } from "@angular/core";
import { Product } from "../product/product.types";
import { ApiService } from "../shared/services/api.service";
import { Observable, tap } from "rxjs";

@Injectable({
    providedIn: 'root',
})
export class CatalogService {
    items: Product[] = [];
    private apiService = inject(ApiService);

    fetch(): Observable<Product[]> {
        return this.apiService.getProducts().pipe(tap((items) => (this.items = items)));
    }
    
    
}