import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '@core/services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-register',
  standalone: true,
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  imports: [CommonModule, RouterModule, ReactiveFormsModule,FormsModule],
})
export class RegisterComponent {
  registerForm: FormGroup;
  isSubmitting = false;
  errorMessage: string | null = null;
  showVerificationInput = false;
  verificationCode = '';
  generatedEmail = '';
  cachedFormData: any;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group(
      {
        username: ['', [Validators.required]],
        firstName: ['', [Validators.required]],
        lastName: ['', [Validators.required]],
        phoneNumber: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', [Validators.required]],
      },
      { validator: this.passwordMatchValidator }
    );
  }

  passwordMatchValidator(group: FormGroup) {
    const password = group.get('password')?.value;
    const confirm = group.get('confirmPassword')?.value;
    return password === confirm ? null : { mismatch: true };
  }

  onSubmit() {
    if (this.registerForm.invalid) return;
  
    const formData = this.registerForm.value;
    this.isSubmitting = true;
    this.errorMessage = null;
  
    this.authService.register(formData).subscribe({
      next: (response) => {
        localStorage.setItem('registerForm', JSON.stringify(formData));
        this.router.navigate(['/verify-email'], {
          queryParams: { email: formData.email }
        });
      },
      error: (error) => {
        this.isSubmitting = false;
        
        // Turli xil xato formatlarini qayta ishlash
        if (error.error) {
          this.errorMessage = error.error.message || 
                            error.error.error || 
                            JSON.stringify(error.error);
        } else if (error.message) {
          this.errorMessage = error.message;
        } else {
          this.errorMessage = 'Ro\'yxatdan o\'tishda noma\'lum xato yuz berdi';
        }
        
        console.error('Ro\'yxatdan o\'tish xatosi:', error); // Tuzatish uchun to'liq xatoni ko'rsatish
      }
    });
  }
}





