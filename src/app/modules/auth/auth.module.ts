// auth.module.ts yoki user.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from '../auth/register/register.component';
import { LoginComponent } from '../auth/login/login.component';
import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [

  ],
  imports: [
    RegisterComponent,
    LoginComponent,
    CommonModule,
    ReactiveFormsModule // ✅ Bu yerda bo'lishi shart
    ,FormsModule
  ]
})
export class AuthModule {}
