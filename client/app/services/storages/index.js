import { Storage } from './Storage';

export const sessionStorage = new Storage(Storage.sessionStorage);
export const localStorage = new Storage(Storage.localStorage);
