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
    price_filters: any[] = [];
    cart: any[] = [];
    pageOfItems: Array<any>;

    onChangePage(pageOfItems: Array<any>) {
        this.pageOfItems = pageOfItems;
    }

    addToCart(product_id) {
        this.cart.push(product_id);
    }

    addBrandFilter(brand_id) {
        this.filters.push(brand_id);
        this.filterData();
    }

    removeBrandFilter(brand_id: number) {
        this.filters = this.filters.filter(filter => filter !== brand_id);
        this.filterData();
    }

    addPriceFilter(min, max) {
        this.price_filters.push([min, max]);
        this.filterData();
    }
    removePriceFilter(min, max) {
        this.price_filters = this.price_filters.filter(filter => filter[0] !== min && filter[1] !== max);
        this.filterData();
    }

    private filterData() {
        if (this.filters.length) {
            this.selected_goods = this.goods.filter( s => this.filters.indexOf(s.brand) > -1);
        } else {
            this.selected_goods = this.goods;
        }

        if (this.price_filters.length) {
            let min = this.price_filters[0][0];
            let max = this.price_filters[0][1];
            this.price_filters.forEach(function (el) {
                if (el[0] < min ) { min = el[0]; }
                if (el[1] > max ) { max = el[1]; }
            });
            this.selected_goods = this.selected_goods.filter(s => s.price > min && s.price <= max);
        }
    }
}
