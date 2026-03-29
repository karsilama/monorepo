import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  getToken(): string | null {
    /**
     * @todo: Implement token retrieval logic
     */
    return '12345';
  }
}
