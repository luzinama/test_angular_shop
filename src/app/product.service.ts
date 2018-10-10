import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';

import { Observable } from 'rxjs';

const API_URL = environment.apiUrl;

@Injectable({ providedIn: 'root' })
export class ProductService {

  private productsUrl = API_URL + '/products';

  constructor( private http: HttpClient ) { }
  getProducts (page, brands, price): Observable<HttpResponse> {
    let url = `${this.productsUrl}/?_page=` + page + `&_limit=8&_sort=price`;
    if (brands.length) {
      brands.forEach(function(brand) { url = url + '&brand=' + brand; });
    }
    if (price.length) {
      url = url + '&price_gte=' + price[0] + '&price_lte=' + price[1];
    }
    return this.http.get<any[]>(url, {observe: 'response'});
  }
}
