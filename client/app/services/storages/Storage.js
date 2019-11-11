export class Storage {
  static localStorage = window.localStorage;

  static sessionStorage = window.sessionStorage;

  constructor(storageType) {
    this.storage = storageType;
  }

  set(property, value) {
    this.storage.setItem(property, JSON.stringify(value));
  }

  get(property) {
    const value = this.storage.getItem(property);
    return value ? JSON.parse(value) : null;
  }

  remove(property) {
    this.storage.removeItem(property);
  }
}
