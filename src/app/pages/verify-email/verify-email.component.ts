import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { AuthService } from '@core/services/auth.service';

@Component({
  selector: 'app-verify-email',
  standalone: true,
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.scss'],
  imports: [FormsModule, ReactiveFormsModule, RouterModule, CommonModule]
})
export class VerifyEmailComponent implements OnInit {
  email: string = '';
  Code: string = '';
  isVerifying: boolean = false;
  errorMessage: string = '';
  successMessage: string = '';
  cachedFormData: any;

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.email = params['email'] || '';
    });

    const cachedData = localStorage.getItem('registerForm');
    if (cachedData) {
      this.cachedFormData = JSON.parse(cachedData);
      if (!this.email && this.cachedFormData.email) {
        this.email = this.cachedFormData.email;
      }
    }
  }

  verifyEmail(): void {
    if (!this.email || !this.Code) {
      this.errorMessage = 'Iltimos, email va tasdiqlash kodini kiriting';
      return;
    }
  
    this.isVerifying = true;
    this.errorMessage = '';
    this.successMessage = '';
  
    console.log('Tasdiqlash so\'rovi yuborilmoqda...'); // Debug uchun
  
    this.authService.verifyEmail(this.email, this.Code).subscribe({
      next: (response) => {
        console.log('Tasdiqlash javobi:', response); // Debug uchun
        this.isVerifying = false;
        
        if (response.success) {
          this.successMessage = response.message || 'Email muvaffaqiyatli tasdiqlandi!';
          localStorage.removeItem('registerForm');
          setTimeout(() => {
            this.router.navigate(['/login'], {
              queryParams: { verified: true }
            });
          }, 2000);
        } else {
          this.errorMessage = response.message || 'Tasdiqlash jarayonida xato yuz berdi';
        }
      },
      error: (err) => {
        console.error('Tasdiqlash xatosi:', err); // Debug uchun
        this.isVerifying = false;
        this.errorMessage = err.error?.message || 'Serverda xatolik yuz berdi';
        
        // Agar status code 401 (Unauthorized) bo'lsa
        if (err.status === 401) {
          this.errorMessage = 'Kirish huquqi yo\'q. Iltimos, qayta kiring.';
        }
      }
    });
  }
  
  resendCode(): void {
    if (!this.email) {
      this.errorMessage = 'Email manzili topilmadi';
      return;
    }

    this.errorMessage = '';
    this.successMessage = '';

    this.authService.resendVerificationCode(this.email).subscribe({
      next: (response) => {
        if (response.success) {
          this.successMessage = response.message || 'Yangi tasdiqlash kodi emailingizga yuborildi';
        } else {
          this.errorMessage = response.message || 'Kodni qayta yuborishda xatolik';
        }
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Serverda xatolik yuz berdi';
      }
    });
  }
}