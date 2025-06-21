// app.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IProduct } from '@core/models/product.model'; // Modelni import qiling
import { environment } from 'environments/environment';
@Injectable({
  providedIn: 'root', // Servisni butun ilovada mavjud qilish
})
export class AppService {

  private apiUrl = `${environment.apiUrl}/products`; // API manzili

  constructor(private http: HttpClient) {}

  // Mahsulotlarni olish uchun metod
  getProducts(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(this.apiUrl);
  }

  // Mahsulotni qo'shish
  addProduct(product: IProduct): Observable<IProduct> {
    return this.http.post<IProduct>(this.apiUrl, product);
  }

  // Mahsulotni o'chirish
  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
