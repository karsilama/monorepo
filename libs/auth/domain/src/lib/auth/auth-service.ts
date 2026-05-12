import { Injectable } from '@angular/core';

export const PROFILE_STORAGE_USER_LOGIN_KEY = 'profile-storage-user-login-key';

export interface ValidateUserModel {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
  accessToken: string;
  refreshToken: string;
}

/**
 * @todo Move to env
 */
const API_URL = 'https://dummyjson.com/auth/login';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  /**
   * Validate the current user
   * Fake implementation
   * Promise based
   */

  public getAuthToken() {
    return JSON.parse(
      localStorage.getItem(PROFILE_STORAGE_USER_LOGIN_KEY) ?? 'null',
    );
  }

  public async loginUser(currentUser: {
    username: string;
    password: string;
    expiresInMins: number;
  }): Promise<ValidateUserModel> {
    const requestBody = currentUser;

    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestBody),
    });

    const jsonData = await response.json();

    localStorage.setItem(
      PROFILE_STORAGE_USER_LOGIN_KEY,
      JSON.stringify(jsonData),
    );

    return jsonData;
  }

  /**
   * @todo
   * Token validations
   */
  public validateToken(): boolean {
    return this.getAuthToken().accessToken;
  }

  /**
   * @todo
   * Permissions
   */
  public userCanEdit(): boolean {
    return true;
  }
}
