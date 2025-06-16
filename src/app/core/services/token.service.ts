import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private readonly STORAGE_KEY = 'userData';

  saveUser(user: any): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(user));
  }

  getUser(): any | null {
    const data = localStorage.getItem(this.STORAGE_KEY);
    return data ? JSON.parse(data) : null;
  }

  clear(): void {
    localStorage.removeItem(this.STORAGE_KEY);
  }
}
