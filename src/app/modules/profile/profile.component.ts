import { Component, OnInit, ViewChild, TemplateRef, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatMenuModule } from '@angular/material/menu';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpEventType } from '@angular/common/http';
import { animate, state, style, transition, trigger } from '@angular/animations';

import { UserService } from '@core/services/user.service';
import { ProductService } from '@core/services/product.service';
import { NotificationService } from '@core/services/notification.service';
import { FileUploadService } from '@core/services/file-upload.service';
import { IProduct } from '@core/models/product.model';
import { IUser } from '@core/models/user.model';
import { UserProfileUpdate } from '@core/models/user-profile-update.model';
import { ConfirmationDialogComponent } from '@app/modules/shared/components/confirmation-dialog/confirmation-dialog.component';
import { ProductFormComponent } from '@app/modules/products/product-form/product-form.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  imports: [
    CommonModule,
    RouterModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    MatCardModule,
    MatTabsModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatMenuModule,
    ReactiveFormsModule
  ],
  animations: [
    trigger('fadeInOut', [
      state('void', style({ opacity: 0 })),
      transition(':enter, :leave', [
        animate(300)
      ])
    ]),
    trigger('slideInOut', [
      transition(':enter', [
        style({ transform: 'translateY(20px)', opacity: 0 }),
        animate('200ms ease-out', style({ transform: 'translateY(0)', opacity: 1 }))
      ]),
      transition(':leave', [
        animate('200ms ease-in', style({ transform: 'translateY(20px)', opacity: 0 }))
      ])
    ]),
    trigger('cardHover', [
      state('normal', style({ transform: 'scale(1)' })),
      state('hovered', style({ transform: 'scale(1.03)' })),
      transition('normal <=> hovered', animate('150ms ease-in-out'))
    ])
  ]
})
export class ProfileComponent implements OnInit {
  @ViewChild('loadingTpl') loadingTpl!: TemplateRef<any>;
  user: IUser | null = null;
  userProducts: IProduct[] = [];
  isLoading = true;
  isEditing = false;
  avatarUploadProgress = 0;
  isUploading = false;
  activeTab = 'products';
  profileForm: FormGroup;
  hoverStates: { [key: number]: string } = {};
  private userId: number | null = null;
  screenWidth = window.innerWidth;

  constructor(
    private userService: UserService,
    private productService: ProductService,
    private fb: FormBuilder,
    private notification: NotificationService,
    private fileUploadService: FileUploadService,
    private dialog: MatDialog,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.profileForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.maxLength(50)]],
      lastName: ['', [Validators.required, Validators.maxLength(50)]],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^\+?\d{10,15}$/)]],
      bio: ['', [Validators.maxLength(500)]]
    });
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.screenWidth = window.innerWidth;
  }

  ngOnInit(): void {
    this.loadUserProfile();
  }

  loadUserProfile(): void {
    const userId = 1; // Replace with actual auth service call
    this.userService.getProfile(userId).subscribe({
      next: (user) => {
        this.user = user;
        this.userId = user.id;
        this.profileForm.patchValue({
          firstName: user.firstName,
          lastName: user.lastName,
          phoneNumber: user.phoneNumber,
          bio: user.bio || ''
        });
        this.loadUserProducts();
      },
      error: (err) => {
        this.notification.error('Failed to load profile');
        this.isLoading = false;
      }
    });
  }

  loadUserProducts(): void {
    if (!this.userId) return;
    this.productService.getAllProducts().subscribe({
      next: (products) => {
        this.userProducts = products.filter(p =>
          p.userEmail === this.user?.email || p.userPhone === this.user?.phoneNumber
        );
        this.isLoading = false;
      },
      error: (err) => {
        this.notification.error('Failed to load your products');
        this.isLoading = false;
      }
    });
  }

  toggleEdit(): void {
    this.isEditing = !this.isEditing;
    if (!this.isEditing && this.user) {
      this.profileForm.patchValue({
        firstName: this.user.firstName,
        lastName: this.user.lastName,
        phoneNumber: this.user.phoneNumber,
        bio: this.user.bio || ''
      });
    }
  }

  saveProfile(): void {
    if (this.profileForm.invalid || !this.userId) return;

    const updateData: UserProfileUpdate = {
      firstName: this.profileForm.value.firstName,
      lastName: this.profileForm.value.lastName,
      username: this.profileForm.value.username,
      bio: this.profileForm.value.bio
    };

    this.userService.updateProfile(this.userId, updateData).subscribe({
      next: () => {
        this.notification.success('Profile updated successfully');
        this.loadUserProfile();
        this.isEditing = false;
      },
      error: (err) => {
        this.notification.error('Failed to update profile');
      }
    });
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files?.length || !this.userId) return;

    const file = input.files[0];
    if (file.size > 5 * 1024 * 1024) { // 5MB limit
      this.notification.error('File size should be less than 5MB');
      return;
    }

    this.isUploading = true;
    this.avatarUploadProgress = 0;

    this.fileUploadService.uploadAvatar(this.userId, file).subscribe({
      next: (event) => {
        if (event.type === HttpEventType.UploadProgress) {
          this.avatarUploadProgress = Math.round(100 * event.loaded / (event.total || 1));
        } else if (event.type === HttpEventType.Response) {
          this.snackBar.open('Avatar updated successfully', 'Close', {
            duration: 3000,
            panelClass: 'success-snackbar'
          });
          this.loadUserProfile();
          this.isUploading = false;
        }
      },
      error: (err) => {
        this.notification.error('Failed to upload avatar');
        this.isUploading = false;
      }
    });
  }

  openDeleteDialog(productId: number): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '350px',
      data: {
        title: 'Confirm Delete',
        message: 'Are you sure you want to delete this product?',
        confirmText: 'Delete',
        cancelText: 'Cancel'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteProduct(productId);
      }
    });
  }

  deleteProduct(productId: number): void {
    this.productService.deleteProduct(productId).subscribe({
      next: () => {
        this.notification.success('Product deleted successfully');
        this.loadUserProducts();
      },
      error: (err) => {
        this.notification.error('Failed to delete product');
      }
    });
  }

  openProductForm(product?: IProduct): void {
    const dialogRef = this.dialog.open(ProductFormComponent, {
      width: '600px',
      data: { product },
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadUserProducts();
      }
    });
  }

  softDeleteProfile(): void {
    if (!this.userId) return;
    
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '400px',
      data: {
        title: 'Deactivate Account',
        message: 'Your profile and products will be hidden. You can reactivate later.',
        confirmText: 'Deactivate',
        cancelText: 'Cancel'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && this.userId) {
        this.userService.softDeleteProfile(this.userId).subscribe({
          next: () => {
            this.notification.success('Account deactivated successfully');
            this.router.navigate(['/']);
          },
          error: (err) => {
            this.notification.error('Failed to deactivate account');
          }
        });
      }
    });
  }

  deleteProfile(): void {
    if (!this.userId) return;
    
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '400px',
      data: {
        title: 'Delete Account Permanently',
        message: 'This cannot be undone! All your data will be permanently deleted.',
        confirmText: 'Delete Forever',
        cancelText: 'Cancel'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && this.userId) {
        this.userService.deleteProfile(this.userId).subscribe({
          next: () => {
            this.notification.success('Account deleted successfully');
            this.router.navigate(['/']);
          },
          error: (err) => {
            this.notification.error('Failed to delete account');
          }
        });
      }
    });
  }

  changeTab(tab: string): void {
    this.activeTab = tab;
  }

  onCardMouseEnter(productId: number): void {
    this.hoverStates[productId] = 'hovered';
  }

  onCardMouseLeave(productId: number): void {
    this.hoverStates[productId] = 'normal';
  }

  getCardState(productId: number): string {
    return this.hoverStates[productId] || 'normal';
  }
}