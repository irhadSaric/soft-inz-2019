import { IStorageService } from "../StorageService";
import { StorageKeys } from "../../common/Constants";
import { IRole } from "../../model/role/Role";

const SESSION_IDENTIFIER_STORAGE_KEY = "sessionid";

let isLoggedIn: boolean | undefined = undefined;
let username: string = "";
let roles: Array<IRole> = [];
let permissions: Array<string> = [];
let userId: number | undefined = undefined;

export interface ICredentialsService {
  setUsername(username: string): void;
  getUsername(): string;
  setIsLoggedIn(value: boolean): void;
  getIsLoggedIn(): Promise<boolean>;
  getSessionIdentifier(): Promise<string | null>;
  getEmailFromStorage(): Promise<string | null>;
  getPassword(): Promise<string | null>;
  getRoles(): Promise<IRole[]>;
  setRoles(value: any): void;
  saveEmailToStorage(email: string): Promise<void>;
  savePasswordToStorage(password: string): Promise<void>;
  getPermissions(): Promise<string[]>;
  setPermissions(value: any): void;
  setUserId(userId: number): void;
  getUserId(): Promise<number | undefined>;
}

const CredentialsService = ({ storageService }): ICredentialsService => {
  const _storageService: IStorageService = storageService;

  return {
    setUsername(value: string) {
      username = value;
    },
    getUsername() {
      return username;
    },

    async getIsLoggedIn() {
      if (isLoggedIn !== undefined) {
        return isLoggedIn;
      }
      let value = await storageService.get("loginStatus");

      isLoggedIn = value === "true";
      return isLoggedIn;
    },

    setIsLoggedIn(value: boolean) {
      isLoggedIn = value;
      _storageService.save("loginStatus", value);
    },

    async getSessionIdentifier() {
      return _storageService.get(SESSION_IDENTIFIER_STORAGE_KEY);
    },

    async getEmailFromStorage() {
      return _storageService.get(StorageKeys.EMAIL);
    },

    async getPassword() {
      return _storageService.get(StorageKeys.PASSWORD);
    },

    async getRoles() {
      return roles;
    },

    async setRoles(value: Array<IRole>) {
      value.forEach(role => {
        roles.push(role);
      });
    },

    async saveEmailToStorage(email: string) {
      return _storageService.save(StorageKeys.EMAIL, email);
    },

    async savePasswordToStorage(password: string) {
      return _storageService.save(StorageKeys.PASSWORD, password);
    },

    async getPermissions() {
      return permissions;
    },

    async setPermissions(value: Array<string>) {
      value.forEach(permission => {
        permissions.push(permission);
      });
    },

    async setUserId(value: number) {
      userId = value;
    },

    async getUserId() {
      return userId;
    }
  };
};

export default CredentialsService;
