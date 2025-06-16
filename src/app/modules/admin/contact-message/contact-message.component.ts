import { Component, OnInit } from '@angular/core';
import { ContactMessageService } from '@core/services/contact-message.service';
import { IContactMessage } from '@core/models/contact-message.model';
import { IContactMessageCreate } from '@core/models/contact-message-create.model';
import { NotificationService } from '@core/services/notification.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-contact-message',
  templateUrl: './contact-message.component.html',
  styleUrls: ['./contact-message.component.scss'],
  imports:[CommonModule,MatIconModule,MatProgressSpinnerModule,MatFormFieldModule,ReactiveFormsModule],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('300ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ]),
    trigger('expandCollapse', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)'))
    ])
  ]
})
export class ContactMessageComponent implements OnInit {
  contactForm: FormGroup;
  messages: IContactMessage[] = [];
  isLoading = false;
  isSending = false;
  showMessages = false;
  activeMessageId: number | null = null;

  constructor(
    private contactService: ContactMessageService,
    private notification: NotificationService,
    private fb: FormBuilder
  ) {
    this.contactForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: [''],
      message: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  ngOnInit(): void {
    this.loadMessages();
  }

  loadMessages(): void {
    this.isLoading = true;
    this.contactService.getAll().subscribe({
      next: (messages) => {
        this.messages = messages;
        this.isLoading = false;
      },
      error: (err) => {
        this.isLoading = false;
        console.error(err);
      }
    });
  }

  onSubmit(): void {
    if (this.contactForm.invalid) {
      this.notification.error('Iltimos, barcha maydonlarni toʻgʻri toʻldiring');
      return;
    }

    this.isSending = true;
    const messageData: IContactMessageCreate = this.contactForm.value;

    this.contactService.create(messageData).subscribe({
      next: () => {
        this.contactForm.reset();
        this.isSending = false;
        this.loadMessages();
      },
      error: (err) => {
        this.isSending = false;
        console.error(err);
      }
    });
  }

  toggleMessageDetails(id: number): void {
    this.activeMessageId = this.activeMessageId === id ? null : id;
  }

  deleteMessage(id: number): void {
    if (confirm('Haqiqatan ham bu xabarni oʻchirmoqchimisiz?')) {
      this.contactService.delete(id).subscribe({
        next: () => {
          this.loadMessages();
        },
        error: (err) => {
          console.error(err);
        }
      });
    }
  }

  toggleMessagesView(): void {
    this.showMessages = !this.showMessages;
    if (this.showMessages) {
      this.loadMessages();
    }
  }

  getStatusIcon(isRead: boolean, isResponded: boolean): string {
    if (isResponded) return 'check_circle';
    if (isRead) return 'mark_email_read';
    return 'mark_email_unread';
  }

  getStatusColor(isRead: boolean, isResponded: boolean): string {
    if (isResponded) return 'responded';
    if (isRead) return 'read';
    return 'unread';
  }
}