import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IAdminUserUpdate } from '../models/admin-user-update.model';
import { IUserFilter } from '../models/user-filter.model';

@Injectable({
  providedIn: 'root'
})
export class AdminUserService {
  private readonly API_URL = 'https://localhost:7179/api/adminusers';

  constructor(private http: HttpClient) {}

  // Barcha admin foydalanuvchilarni olish
  getAll(): Observable<any> {
    return this.http.get<any>(`${this.API_URL}/GetAll`);
  }

  // Foydalanuvchini ID orqali olish
  getById(id: number): Observable<any> {
    return this.http.get<any>(`${this.API_URL}/GetById/${id}`);
  }

  // Admin foydalanuvchini yangilash
  update(id: number, data: IAdminUserUpdate): Observable<any> {
    return this.http.put<any>(`${this.API_URL}/Update/${id}`, data);
  }

  // Foydalanuvchini o‘chirish (soft delete)
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/delete/${id}`);
  }

  // Foydalanuvchi holatini (isActive) o‘zgartirish
  changeStatus(id: number, isActive: boolean): Observable<void> {
    const params = new HttpParams().set('isActive', isActive);
    return this.http.patch<void>(`${this.API_URL}/${id}/status`, null, { params });
  }

  // Foydalanuvchi rolini o‘zgartirish
  changeRole(id: number, newRole: string): Observable<void> {
    const params = new HttpParams().set('newRole', newRole);
    return this.http.patch<void>(`${this.API_URL}/${id}/role`, null, { params });
  }

  // O‘chirilgan foydalanuvchini tiklash
  restore(id: number): Observable<void> {
    return this.http.patch<void>(`${this.API_URL}/restore/${id}`, null);
  }

  // Hozirgi foydalanuvchini olish
  getSelf(id: number): Observable<any> {
    return this.http.get<any>(`${this.API_URL}/self/${id}`);
  }

  // Filter orqali admin foydalanuvchilarni olish (agar backend shunaqa query qabul qilsa)
  getFilteredUsers(filter: IUserFilter): Observable<any> {
    let params = new HttpParams()
      .set('SearchTerm', filter.searchTerm|| '')
      .set('PageNumber', filter.pageNumber)
      .set('PageSize', filter.pageSize);

    if (filter.roleFilter !== undefined && filter.roleFilter !== null)
      params = params.set('RoleFilter', filter.roleFilter);

    if (filter.isActiveFilter !== undefined && filter.isActiveFilter !== null)
      params = params.set('IsActiveFilter', filter.isActiveFilter);

    return this.http.get<any>(`${this.API_URL}/GetAll`, { params });
  }
}
