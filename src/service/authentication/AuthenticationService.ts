import { IHttpService } from "../HttpService";
import Role from "../../model/role/Role";
import { ICountry } from "../../model/country/Country";

export interface IAuthenticationService {
  login(email: string, password: string): Promise<any>;
  register(
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    phone: string,
    country: ICountry
  ): Promise<any>;
}

const AuthenticationService = ({ httpService }): IAuthenticationService => {
  const _http: IHttpService = httpService;
  const _basePath = "/login";
  const _registerPath = "/register";

  return {
    async login(email: string, password: string) {
      const response = await _http.post(_basePath, {
        params: {
          email,
          password
        }
      });
      let { userId, roles, permissions } = await _http.toJSON(response);
      roles = roles.map(role => Role(role));
      return { userId, email, roles, permissions };
    },

    async register(
      firstName: string,
      lastName: string,
      email: string,
      password: string,
      phone: string,
      country: ICountry
    ) {
      const response = await _http.post(_registerPath, {
        params: {
          firstName,
          lastName,
          email,
          password,
          phone,
          country
        }
      });
      return _http.toText(response);
    }
  };
};

export default AuthenticationService;
