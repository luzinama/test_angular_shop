import {Component, OnInit} from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

import {BRANDS} from './mock-goods';
import { ProductService } from './product.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    title = 'test-angular-shop';
    products: any[];
    brands: any[] = BRANDS;
    filters: any[] = [];
    price_filters: any[] = [];
    min_price = 0; max_price = 9999;
    cart: any[] = [];
    page = 1;
    total_count;

    constructor( private cookieService: CookieService, private productService: ProductService ) {}

    ngOnInit(): void {
        this.getProducts();
        if (this.cookieService.check('cart')) {
            this.cart = JSON.parse(this.cookieService.get('cart'));
        }
    }

    changePage(page: number) {
        this.page = page;
        this.getProducts();
    }

    getProducts(): void {
        this.productService.getProducts(this.page, this.filters, [this.min_price, this.max_price])
            .subscribe(resp => {this.products = resp.body; this.total_count = resp.headers.get('x-total-count'); });
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
        if (this.price_filters.length) {
            this.min_price = this.price_filters[0][0];
            this.max_price = this.price_filters[0][1];
            for (let i = 1; i < this.price_filters.length; i++) {
                if (this.price_filters[i][0] < this.min_price) { this.min_price = this.price_filters[i][0]; }
                if (this.price_filters[i][1] > this.max_price) { this.max_price = this.price_filters[i][1]; }
            }
        }
        this.getProducts();
    }
}
