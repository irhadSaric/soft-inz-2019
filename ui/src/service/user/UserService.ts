import { IHttpService } from "../HttpService";
import User from "../../model/user/User";

export interface IUserService {
  getUsers(): Promise<any>;
}

const UserService = ({ httpService }): IUserService => {
  const _http: IHttpService = httpService;
  const _basePath: string = "/api/user";
  const _usersPath: string = "/users";

  return {
    async getUsers() {
      const path = _http.buildPath(_basePath, _usersPath);
      const response = await _http.get(path);
      const responseJSON = await _http.toJSON(response);
      return User(responseJSON);
    }
  };
};

export default UserService;
