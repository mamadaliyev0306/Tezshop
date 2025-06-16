import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Notyf } from 'notyf';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private notyf: Notyf | null = null;

  constructor(@Inject(PLATFORM_ID) private platformId: any) {
    if (isPlatformBrowser(this.platformId)) {
      this.notyf = new Notyf();
    }
  }

  success(msg: string) {
    this.notyf?.success(msg);
  }
  warning(message: string): void {
    console.warn('Warning:', message);
  }
  error(msg: string) {
    this.notyf?.error(msg);
  }
}






