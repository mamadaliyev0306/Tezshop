// shared.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';

@NgModule({

  imports: [CommonModule,LoadingSpinnerComponent,LoadingSpinnerComponent]
})
export class SharedModule { }
