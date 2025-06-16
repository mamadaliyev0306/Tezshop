import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { IProduct ,PaginatedProductsResponse} from '../models/product.model';
import { NotificationService } from './notification.service';
import { IProductFilter } from '../models/product-filter.model'; // <-- filtering uchun model
import { ICreateProduct } from '../models/product-create.model';
import { IUpdateProduct } from '../models/product-update.model';
@Injectable({ providedIn: 'root' })
export class ProductService {
  private readonly API_URL = 'https://localhost:7179/api/product';
  private productsCache = new BehaviorSubject<IProduct[] | null>(null);

  constructor(
    private http: HttpClient,
    private notification: NotificationService
  ) {}

  private updateCache(products: IProduct[]): void {
    this.productsCache.next(products);
  }

  getAllProducts(refresh = false): Observable<IProduct[]> {
    if (!refresh && this.productsCache.value) {
      return of(this.productsCache.value);
    }

    return this.http.get<IProduct[]>(`${this.API_URL}/getall`).pipe(
      tap(products => this.updateCache(products)),
      catchError(error => {
        this.notification.error('Mahsulotlarni yuklab bo‘lmadi.');
        return throwError(() => error);
      })
    );
  }

  getProductById(id: number): Observable<IProduct> {
    return this.http.get<IProduct>(`${this.API_URL}/getbyId/${id}`).pipe(
      catchError(error => {
        this.notification.error('Mahsulot tafsilotlarini olishda xatolik.');
        return throwError(() => error);
      })
    );
  }

  getProductsByCategory(categoryId: number): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(`${this.API_URL}/getbycategory/${categoryId}`).pipe(
      catchError(error => {
        this.notification.error('Kategoriya mahsulotlarini yuklashda xatolik.');
        return throwError(() => error);
      })
    );
  }

  searchProducts(searchTerm: string): Observable<IProduct[]> {
    const params = new HttpParams().set('searchTerm', searchTerm);
    return this.http.get<IProduct[]>(`${this.API_URL}/search`, { params }).pipe(
      catchError(error => {
        this.notification.error('Qidiruvda xatolik yuz berdi.');
        return throwError(() => error);
      })
    );
  }

  createProduct(product: ICreateProduct): Observable<void> {
    return this.http.post<void>(`${this.API_URL}/create`, product).pipe(
      tap(() => {
        this.notification.success('Mahsulot muvaffaqiyatli qo‘shildi.');
      }),
      catchError(error => {
        this.notification.error('Mahsulot qo‘shishda xatolik.');
        return throwError(() => error);
      })
    );
  }

  updateProduct(product: IUpdateProduct): Observable<void> {
    return this.http.put<void>(`${this.API_URL}/update`, product).pipe(
      tap(() => {
        this.notification.success('Mahsulot yangilandi.');
      }),
      catchError(error => {
        this.notification.error('Mahsulotni yangilashda xatolik.');
        return throwError(() => error);
      })
    );
  }

  updateProductStock(productId: number, quantity: number): Observable<void> {
    const params = new HttpParams()
      .set('productId', productId)
      .set('quantity', quantity);
    return this.http.patch<void>(`${this.API_URL}/update-stock`, null, { params }).pipe(
      tap(() => {
        this.notification.success('Stok yangilandi.');
      }),
      catchError(error => {
        this.notification.error('Stokni yangilashda xatolik.');
        return throwError(() => error);
      })
    );
  }

  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/delete/${id}`).pipe(
      tap(() => {
        this.notification.success('Mahsulot o‘chirildi.');
      }),
      catchError(error => {
        this.notification.error('Mahsulotni o‘chirishda xatolik.');
        return throwError(() => error);
      })
    );
  }

  filterProducts(filterDto: IProductFilter, pageNumber: number = 1, pageSize: number = 10): Observable<IProduct[]> {
    return this.http.post<IProduct[]>(`${this.API_URL}/filter?pageNumber=${pageNumber}&pageSize=${pageSize}`, filterDto).pipe(
      catchError(error => {
        this.notification.error('Filtrlashda xatolik.');
        return throwError(() => error);
      })
    );
  }

  getRelatedProducts(productId: number): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(`${this.API_URL}/getrelatedproducts/${productId}`).pipe(
      catchError(error => {
        this.notification.error('O‘xshash mahsulotlarni yuklashda xatolik.');
        return throwError(() => error);
      })
    );
  }

  getProductsBySubcategory(
    categoryId: number, 
    subcategory: string, 
    page: number = 1, 
    pageSize: number = 20
  ): Observable<PaginatedProductsResponse> {
    const params = new HttpParams()
      .set('categoryId', categoryId.toString())
      .set('subcategory', subcategory)
      .set('page', page.toString())
      .set('pageSize', pageSize.toString());

    return this.http.get<PaginatedProductsResponse>(`${this.API_URL}/subcategory`, { params });
  }
  getProductsWithWishlist(userId: number) {
    return this.http.get<IProduct[]>(`${this.API_URL}/${userId}`);
  }
}

