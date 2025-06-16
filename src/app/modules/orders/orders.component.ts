import { Component, OnInit } from '@angular/core';
import { OrderService } from '@core/services/order.service';
import { IOrder } from '../../core/models/order.model';
import { NotificationService } from '@core/services/notification.service';
import { animate, style, transition, trigger } from '@angular/animations';
import { OrderStatus } from '@core/models/enum/orderstuts.enum';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-orders',
  standalone: true,
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatFormFieldModule,
    RouterModule
  ],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-20px)' }),
        animate('300ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ]),
      transition(':leave', [
        animate('200ms ease-in', style({ opacity: 0, transform: 'translateY(-20px)' }))
      ])
    ]),
    trigger('rotate', [
      transition(':enter', [
        style({ transform: 'rotate(0deg)' }),
        animate('500ms', style({ transform: 'rotate(360deg)' }))
      ])
    ])
  ]
})
export class OrdersComponent implements OnInit {
  orders: IOrder[] = [];
  filteredOrders: IOrder[] = [];
  isLoading = true;
  isRefreshing = false;
  hasOrders = false;
  OrderStatus = OrderStatus;
  selectedStatus: OrderStatus | 'ALL' = 'ALL';
  statusOptions = [
    { value: 'ALL', label: 'All Orders' },
    { value: OrderStatus.Pending, label: 'Pending' },
    { value: OrderStatus.Processing, label: 'Processing' },
    { value: OrderStatus.Completed, label: 'Completed' },
    { value: OrderStatus.Cancelled, label: 'Cancelled' }
  ];

  constructor(
    private orderService: OrderService,
    private notification: NotificationService
  ) { }

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {
    this.isLoading = true;
    this.orderService.getUserOrders(this.getCurrentUserId()).subscribe({
      next: (orders) => {
        this.orders = orders;
        this.hasOrders = orders.length > 0;
        this.filterOrders();
        this.isLoading = false;
        this.isRefreshing = false;
      },
      error: (err) => {
        this.notification.error('Failed to load orders');
        this.isLoading = false;
        this.isRefreshing = false;
        console.error(err);
      }
    });
  }

  refreshOrders(): void {
    this.isRefreshing = true;
    this.loadOrders();
  }

  filterOrders(): void {
    if (this.selectedStatus === 'ALL') {
      this.filteredOrders = [...this.orders];
    } else {
      this.filteredOrders = this.orders.filter(order => order.status === this.selectedStatus);
    }
  }

  onStatusChange(): void {
    this.filterOrders();
  }

  cancelOrder(orderId: number): void {
    if (confirm('Are you sure you want to cancel this order?')) {
      this.orderService.cancelOrder(orderId).subscribe({
        next: () => {
          this.notification.success('Order cancelled successfully');
          this.refreshOrders();
        },
        error: (err) => {
          this.notification.error('Failed to cancel order');
          console.error(err);
        }
      });
    }
  }

  getStatusClass(status: OrderStatus): string {
    switch (status) {
      case OrderStatus.Pending:
        return 'status-pending';
      case OrderStatus.Processing:
        return 'status-processing';
      case OrderStatus.Completed:
        return 'status-completed';
      case OrderStatus.Cancelled:
        return 'status-cancelled';
      default:
        return '';
    }
  }

  getCurrentUserId(): number {
    const user = JSON.parse(localStorage.getItem('currentUser') || '{}');
    return user.id;
  }

  trackByOrderId(index: number, order: IOrder): number {
    return order.id;
  }

  getStatusLabel(status: OrderStatus | string): string {
    return this.statusOptions.find(opt => opt.value === status)?.label || status;
  }
  
  getTotalItems(order: IOrder): number {
    return order.orderItems.reduce((sum, item) => sum + item.quantity, 0);
  }
  
  getOrderTotal(order: IOrder): number {
    return order.orderItems.reduce((sum, item) => sum + (item.unitPrice * item.quantity), 0);
  }
}