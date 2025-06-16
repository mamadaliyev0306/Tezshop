// src/app/services/blog.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { NotificationService } from './notification.service';
import { IBlog } from '../models/blog.model'; // You need to create models for BlogDto, BlogCreateDto, BlogUpdateDto
import { IBlogCreate } from '../models/blog-create.model';
import { IBlogUpdate } from '../models/blog-update.model';

@Injectable({
  providedIn: 'root',
})
export class BlogService {
  private readonly API_URL = 'https://localhost:7179/api/blog';

  constructor(
    private http: HttpClient,
    private notification: NotificationService
  ) {}

  // Get all blogs
  getAllBlogs(): Observable<IBlog[]> {
    return this.http.get<IBlog[]>(`${this.API_URL}/getall`).pipe(
      tap(() => {
        this.notification.success('Blogs loaded successfully.');
      }),
      catchError((error) => {
        this.notification.error('Failed to load blogs.');
        return throwError(() => error);
      })
    );
  }

  // Get blog by ID
  getBlogById(id: number): Observable<IBlog> {
    return this.http.get<IBlog>(`${this.API_URL}/getbyid/${id}`).pipe(
      tap(() => {
        this.notification.success('Blog loaded successfully.');
      }),
      catchError((error) => {
        this.notification.error('Failed to load blog.');
        return throwError(() => error);
      })
    );
  }

  // Create a new blog
  createBlog(blog: IBlogCreate): Observable<IBlog> {
    return this.http.post<IBlog>(`${this.API_URL}/create`, blog).pipe(
      tap(() => {
        this.notification.success('Blog created successfully.');
      }),
      catchError((error) => {
        this.notification.error('Failed to create blog.');
        return throwError(() => error);
      })
    );
  }

  // Update an existing blog
  updateBlog(id: number, blog: IBlogUpdate): Observable<IBlog> {
    return this.http.put<IBlog>(`${this.API_URL}/update/${id}`, blog).pipe(
      tap(() => {
        this.notification.success('Blog updated successfully.');
      }),
      catchError((error) => {
        this.notification.error('Failed to update blog.');
        return throwError(() => error);
      })
    );
  }

  // Delete a blog by ID
  deleteBlog(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/delete/${id}`).pipe(
      tap(() => {
        this.notification.success('Blog deleted successfully.');
      }),
      catchError((error) => {
        this.notification.error('Failed to delete blog.');
        return throwError(() => error);
      })
    );
  }
}
