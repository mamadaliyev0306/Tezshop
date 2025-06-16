import { Component, OnInit } from '@angular/core';
import { IProduct } from '@core/models/product.model';
import{AppService}from '@app/app.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  featuredProducts: IProduct[] = [];
  newArrivals: IProduct[] = [];
  isLoading = true;

  constructor(private apiService: AppService) { }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts() {
    this.apiService.getProducts().subscribe(products => {
      this.featuredProducts = products.slice(0, 4);
      this.newArrivals = products.slice(-8);
      this.isLoading = false;
    });
  }
}