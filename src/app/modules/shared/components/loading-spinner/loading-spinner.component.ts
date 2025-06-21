import { Component } from '@angular/core';
import { LoadingService } from '../../../../core/services/loading.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-loading-spinner',
  standalone: true,
  templateUrl: './loading-spinner.component.html',
  styleUrls: ['./loading-spinner.component.scss'],
  imports:[CommonModule]
})
export class LoadingSpinnerComponent {
  constructor(public loadingService: LoadingService) {}
}