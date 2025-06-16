import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IAboutInfo } from '../models/aboutInfo.model';
import { IAboutInfoCreate } from '../models/aboutInfo-create.model';

@Injectable({
  providedIn: 'root'
})
export class AboutInfoService {
  private readonly API_URL = 'https://localhost:7179/api/AboutInfo';

  constructor(private http: HttpClient) {}

  // Barchasini olish
  getAll(): Observable<IAboutInfo[]> {
    return this.http.get<IAboutInfo[]>(`${this.API_URL}/getall`);
  }

  // ID orqali olish
  getById(id: number): Observable<IAboutInfo> {
    return this.http.get<IAboutInfo>(`${this.API_URL}/GetById/${id}`);
  }

  // Yangi AboutInfo qo‘shish
  create(data: IAboutInfoCreate): Observable<IAboutInfo> {
    return this.http.post<IAboutInfo>(`${this.API_URL}/Create`, data);
  }

  // Yangilash
  update(id: number, data: IAboutInfoCreate): Observable<IAboutInfo> {
    return this.http.put<IAboutInfo>(`${this.API_URL}/Update/${id}`, data);
  }

  // O‘chirish
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/delete/${id}`);
  }
}
