import {Component, OnInit} from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { CookieService } from 'ngx-cookie-service';

import {BRANDS, GOODS} from './mock-goods';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    title = 'test-angular-shop';
    products = GOODS;
    brands = BRANDS;
    selected_products = GOODS;
    filters: any[] = [];
    price_filters: any[] = [];
    cart: any[] = [];
    pageOfItems: Array<any>;

    constructor( private cookieService: CookieService ) { }

    ngOnInit(): void {
        if (this.cookieService.check('cart')) {
            this.cart = JSON.parse(this.cookieService.get('cart'));
        }
    }

    onChangePage(pageOfItems: Array<any>) {
        this.pageOfItems = pageOfItems;
    }

    addToCart(product) {
        if (this.cart.length === 0) {
            product.count = 1;
            this.cart.push(product);
        } else {
            let repeat = false;
            for (let i = 0; i < this.cart.length; i++) {
                if (this.cart[i].id === product.id) {
                    repeat = true;
                    this.cart[i].count += 1;
                }
            }
            if (!repeat) {
                product.count = 1;
                this.cart.push(product);
            }
        }
        const expireDate = new Date();
        expireDate.setDate(expireDate.getDate() + 1);
        this.cookieService.set('cart', JSON.stringify(this.cart), expireDate);
    }

    removeFromCart(product) {
        const expireDate = new Date();
        expireDate.setDate(expireDate.getDate() + 1);
        if (product.count > 1) {
            product.count -= 1;
            this.cookieService.set('cart', JSON.stringify(this.cart), expireDate);
            this.cart = JSON.parse(this.cookieService.get('cart'));
        } else if (product.count === 1) {
            const i = this.cart.indexOf(product);
            this.cart.splice(i, 1);
            this.cookieService.set('cart', JSON.stringify(this.cart), expireDate);
            this.cart = JSON.parse(this.cookieService.get('cart'));
        }
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
            this.selected_products = this.products.filter( s => this.filters.indexOf(s.brand) > -1);
        } else {
            this.selected_products = this.products;
        }

        if (this.price_filters.length) {
            let min = this.price_filters[0][0];
            let max = this.price_filters[0][1];
            for (let i = 1; i < this.price_filters.length; i++) {
                if (this.price_filters[i][0] < min) { min = this.price_filters[i][0]; }
                if (this.price_filters[i][1] > max) { max = this.price_filters[i][1]; }
            }
            this.selected_products = this.selected_products.filter(s => s.price > min && s.price <= max);
        }
    }
}
