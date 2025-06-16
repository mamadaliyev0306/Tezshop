import { Injectable } from '@angular/core';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {
  private readonly API_URL = `${environment.apiUrl}/file`;

  constructor(private http: HttpClient) {}

  uploadAvatar(userId: number, file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    
    return this.http.post(`${this.API_URL}/upload-avatar/${userId}`, formData, {
      reportProgress: true,
      observe: 'events'
    });
  }
}