import { localStorage } from './index';

export class UserStorage {
  static getAuthorization() {
    return localStorage.get('authorization');
  }

  static setAuthorization(value) {
    return localStorage.set('authorization', value);
  }

  static removeAuthorization() {
    localStorage.remove('authorization');
  }
}
