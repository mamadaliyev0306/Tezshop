import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { LoadingService } from '@core/services/loading.service';
import { environment } from '../../../environments/environment';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private authService: AuthService,
    private loadingService: LoadingService
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Faqat API so'rovlari uchun loading ko'rsatamiz
    if (this.isApiRequest(req.url)) {
      this.loadingService.show();
    }

    // Token qo'shish
    const token = this.authService.getToken();
    let authReq = req;
    
    if (token) {
      authReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
    }

    return next.handle(authReq).pipe(
      finalize(() => {
        if (this.isApiRequest(req.url)) {
          this.loadingService.hide();
        }
      })
    );
  }

  private isApiRequest(url: string): boolean {
    return url.startsWith(environment.apiUrl) || 
           url.startsWith('/api/') || 
           !url.startsWith('http');
  }
}
