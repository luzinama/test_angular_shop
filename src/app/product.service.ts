import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ProductService {

  private productsUrl = 'api/products';

  constructor( private http: HttpClient ) { }

  getProducts (): Observable<any[]> {
    return this.http.get<any[]>(this.productsUrl);
  }

  getProductsByBrand<Data>(brands): Observable<any> {
    const url = `${this.productsUrl}/?brand=${brands}`;
    return this.http.get<any[]>(url);
  }
}
