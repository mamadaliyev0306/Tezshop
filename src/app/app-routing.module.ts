import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
//import { ProfileComponent } from './modules/profile/profile.component';  // Profile komponentini import qilish
import { ProductListComponent } from './modules/products/product-list/product-list.component';  // Mahsulotlar ro'yxati komponentini import qilish
import { HomeComponent } from '../app/modules/home/home.component';  // Home komponentini import qilish (agar bo'lsa)
import { DashboardComponent } from '../app/modules/admin/dashboard/dashboard.component';
import { AuthGuard } from '../app/core/guards/auth.guard';
// Yo'nalishlar ro'yxati
const routes: Routes = [
  { path: '', component: HomeComponent },  // Home sahifasi uchun yo'nalish (root yo'nalish)
 // { path: 'profile', component: ProfileComponent },  // Profile sahifasi
  { path: 'products', component: ProductListComponent },  // Mahsulotlar ro'yxati sahifasi
  // Boshqa yo'nalishlarni qo'shish mumkin
  { path: '**', redirectTo: '', pathMatch: 'full' }  // Foydalanuvchi noto'g'ri yo'nalishni kiritgan bo'lsa, uni Home sahifasiga yo'naltiradi
  ,{
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard]
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],  // Yo'nalishlar moduli
  exports: [RouterModule]  // RouterModule'ni eksport qilish
})
export class AppRoutingModule { }
