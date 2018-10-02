import {Component, OnInit} from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import {BRANDS, GOODS} from './mock-goods';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'test-angular-shop';
    goods = GOODS;
    brands = BRANDS;
    selected_goods = GOODS;
    filters: any[] = [];
    cart: any[] = [];
    pageOfItems: Array<any>;

    onChangePage(pageOfItems: Array<any>) {
        this.pageOfItems = pageOfItems;
    }

    addFilter(brand_id) {
        this.filters.push(brand_id);
        this.filterData();
    }

    removeFilter(brand_id: number) {
        this.filters = this.filters.filter(filter => filter !== brand_id);
        this.filterData();
    }

    private filterData() {
        if (this.filters.length) {
            this.selected_goods = this.goods.filter( s => this.filters.indexOf(s.brand) > -1);
        } else {
            this.selected_goods = this.goods;
        }
    }
    addToCart(product_id) {
        this.cart.push(product_id);
    }
}
