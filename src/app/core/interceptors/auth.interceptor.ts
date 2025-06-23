import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { LoadingService } from '@core/services/loading.service';
import { environment } from '../../../environments/environment';
import { finalize } from 'rxjs/operators';

export const authInterceptorFn: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const loadingService = inject(LoadingService);

  const isApiRequest =
    req.url.startsWith(environment.apiUrl) ||
    req.url.startsWith('/api/') ||
    !req.url.startsWith('http');

  if (isApiRequest) {
    loadingService.show();
  }

  const token = authService.getToken();

  const authReq = token
    ? req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })
    : req;

  return next(authReq).pipe(
    finalize(() => {
      if (isApiRequest) {
        loadingService.hide();
      }
    })
  );
};
