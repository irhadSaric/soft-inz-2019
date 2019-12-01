import { IHttpService } from "../HttpService";
import User, { IUser } from "../../model/user/User";

export interface IUserService {
  getUsers(): Promise<IUser[]>;
  getUserProfile(userId: number): Promise<IUser>;
  getUserByEmail(email: string): Promise<IUser>;
  updateUserProfile(user: IUser): Promise<any>;
}

const UserService = ({ httpService }): IUserService => {
  const _http: IHttpService = httpService;
  const _basePath: string = "/api/user";
  const _findPath: string = "/find";
  const _allPath: string = "/all";
  const _profilePath: string = "/profile";

  const buildUserList = (data: any): IUser[] => {
    return data.map(item => User(item));
  };

  return {
    async getUsers() {
      const path = _http.buildPath(_basePath, _findPath, _allPath);
      const response = await _http.get(path);
      const responseJSON = await _http.toJSON(response);
      return buildUserList(responseJSON);
    },
    async getUserProfile(userId: number) {
      const path = _http.buildPath(_basePath, _profilePath, userId.toString());
      const response = await _http.get(path);
      const responseJSON = await _http.toJSON(response);
      return User(responseJSON);
    },
    async getUserByEmail(email: string) {
      const path = _http.buildPath(_basePath, _findPath, email);
      const response = await _http.get(path);
      const responseJSON = await _http.toJSON(response);
      return User(responseJSON[0]);
    },
    async updateUserProfile(user: IUser) {
      const path = _http.buildPath(_basePath, _profilePath, user.id.toString());
      const response = await _http.put(path, {
        params: {
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          phone: user.phone,
          country: { id: user.country.id }
        }
      });
      const responseJSON = await _http.toJSON(response);
      return User(responseJSON);
    }
  };
};

export default UserService;
