// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { HomeComponent } from './modules/home/home.component';
import { ProductListComponent } from './modules/products/product-list/product-list.component';
import { LoginComponent } from '@modules/auth/login/login.component';
import { RegisterComponent } from '@modules/auth/register/register.component';
import { ProfileComponent} from '@modules/profile/profile.component';
import { AuthGuard } from '@core/guards/auth.guard';
import { VerifyEmailComponent } from './pages/verify-email/verify-email.component';
import { WishlistItemComponent } from '@modules/wishlists/wishlist-item.component';
import { OrdersComponent } from '@modules/orders/orders.component';
import { ContactFormComponent } from '@modules/contact-form/contact-form.component';
import { CartComponent } from '@modules/cart/cart.component';
export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'products', component: ProductListComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { 
    path: 'profile', 
    component: ProfileComponent
  },
  { 
    path: 'wishlist', 
    component: WishlistItemComponent
  },
  { 
    path: 'orders', 
    component: OrdersComponent
  },
  { 
    path: 'cart', 
    component: CartComponent
  },
  { path: 'verify-email', component: VerifyEmailComponent },
  { path: 'contactform', component: ContactFormComponent }
];

