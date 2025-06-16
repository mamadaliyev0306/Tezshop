import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  userName: string = 'Foydalanuvchi';

  constructor() {}

  ngOnInit(): void {
    // Bu yerda kerakli datalarni olish yoki ishga tushirish mumkin
  }
}
