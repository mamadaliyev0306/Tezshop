import { TestBed } from '@angular/core/testing';
import { NotificationService } from './notification.service';
import { PLATFORM_ID } from '@angular/core';
import { Notyf } from 'notyf';

describe('NotificationService', () => {
  let service: NotificationService;
  let notyfSpy: jasmine.SpyObj<Notyf>;

  beforeEach(() => {
    notyfSpy = jasmine.createSpyObj('Notyf', ['success', 'error']);
    
    TestBed.configureTestingModule({
      providers: [
        NotificationService,
        { provide: PLATFORM_ID, useValue: 'browser' }, // <- muhim
        { provide: Notyf, useValue: notyfSpy } // <- mock Notyf
      ],
    });
    service = TestBed.inject(NotificationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call Notyf.success when success is called', () => {
    const msg = 'Test message';
    service.success(msg);
    expect(notyfSpy.success).toHaveBeenCalledWith(msg);
  });

  it('should not throw error when success is called', () => {
    expect(() => service.success('Test')).not.toThrow();
  });

  it('should call Notyf.error when error is called', () => {
    const msg = 'Error message';
    service.error(msg);
    expect(notyfSpy.error).toHaveBeenCalledWith(msg);
  });
});

