import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ICategory } from '../models/category.model';
import { ICategoryCreate } from '../models/category-create.model';
import { environment } from 'environments/environment';
@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private readonly API_URL = `${environment.apiUrl}/api/category`;

  constructor(private http: HttpClient) {}

  // Barcha kategoriyalarni olish
  getAll(): Observable<ICategory[]> {
    return this.http.get<ICategory[]>(`${this.API_URL}/getall`);
  }

  // Faqat aktiv kategoriyalarni olish
  getActive(): Observable<ICategory[]> {
    return this.http.get<ICategory[]>(`${this.API_URL}/active`);
  }

  // ID orqali kategoriya olish
  getById(id: number): Observable<ICategory> {
    return this.http.get<ICategory>(`${this.API_URL}/getbyId/${id}`);
  }

  // Nomi bo‘yicha kategoriya topish
  getByName(name: string): Observable<ICategoryCreate> {
    return this.http.get<ICategory>(`${this.API_URL}/getbyname/${name}`);
  }

  // Kategoriya va unga tegishli mahsulotlar
  getWithProducts(): Observable<any> {
    return this.http.get<any>(`${this.API_URL}/with-products`);
  }

  // Yangi kategoriya qo‘shish
  addCategory(category: ICategoryCreate): Observable<ICategory> {
    return this.http.post<ICategory>(`${this.API_URL}/add`, category);
  }

  // Kategoriya yangilash
  updateCategory(id: number, category: ICategoryCreate): Observable<ICategory> {
    return this.http.put<ICategory>(`${this.API_URL}/update/${id}`, category);
  }

  // Kategoriya o‘chirish
  deleteCategory(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/delete/${id}`);
  }
}
