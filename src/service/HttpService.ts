import NetworkError, { TNetworkError } from "./error/NetworkError";
import { TAccessToken } from "../model/security/AccessToken";
import ICacheManager from "../model/runtime/cache/ICacheManager";
import { HttpConstants } from "../common/Constants";
import CookieStorageService from "../service/CookieStorageService";

export interface IHttpService {
  get(url: string, args?: RequestArgs): Promise<Response>;
  post(url: string, args?: RequestArgs): Promise<Response>;
  put(url: string, args?: RequestArgs): Promise<Response>;
  remove(url: string, args?: RequestArgs): Promise<Response>;
  uploadFile(url: string, file: any, paramName: string): Promise<any>;
  getFile(url: string): Promise<any>;
  buildUrl(url: string, args?: RequestArgs): string;
  buildPath(...fragments: string[]): string;
  buildAbsolutePath(...fragments: string[]): string;
  toJSON(response: Response): Promise<any>;
  toText(response: Response): Promise<string>;
}

export interface FormArgs {
  multipart: boolean;
}

export interface RequestArgs extends RequestInit {
  params?: object;
  query?: object;
  authenticate?: boolean;
  form?: FormArgs | boolean;
}

const HTTP_ERROR_NAME = "HTTP Error";
const HttpService = ({
  baseUrl
}: {
  baseUrl: string;
  cacheManager: ICacheManager;
}): IHttpService => {
  let _http = fetch;
  let _baseUrl = baseUrl;
  let _cookieStorageService = CookieStorageService();

  function buildRequestArguments(
    args: RequestArgs,
    token: TAccessToken | string | null | undefined,
    csrfToken: string | null
  ): RequestInit {
    args = args || {};
    let method = args.method;
    args.headers = Object.assign({}, args.headers);
    let _useAuth =
      args.authenticate !== undefined && args.authenticate !== undefined
        ? args.authenticate
        : true;
    if (_useAuth && token) {
      args.headers[HttpConstants.AUTH_HEADER] =
        typeof token === "string" ? token : token.authorizationToken;
    }
    if (typeof args.form === "object" && args.form.multipart) {
      args.headers[HttpConstants.CONTENT_TYPE_HEADER_NAME] =
        HttpConstants.MULTIPART_CONTENT_TYPE;
    } else if (args.form) {
      args.headers[HttpConstants.CONTENT_TYPE_HEADER_NAME] =
        HttpConstants.FORM_CONTENT_TYPE;
    } else {
      args.headers[HttpConstants.CONTENT_TYPE_HEADER_NAME] =
        HttpConstants.JSON_CONTENT_TYPE;
    }
    if (
      args.params &&
      (method === HttpConstants.HTTP_POST_METHOD ||
        method === HttpConstants.HTTP_PUT_METHOD ||
        method === HttpConstants.HTTP_DELETE_METHOD)
    ) {
      if (
        args.headers &&
        args.headers[HttpConstants.CONTENT_TYPE_HEADER_NAME] ===
          HttpConstants.JSON_CONTENT_TYPE
      ) {
        args.body = JSON.stringify(args.params);
      } else if (
        args.headers &&
        args.headers[HttpConstants.CONTENT_TYPE_HEADER_NAME] ===
          HttpConstants.MULTIPART_CONTENT_TYPE
      ) {
        args.body = JSON.stringify(args.params);
      } else {
        args.body = encodeFormData(args.params);
      }
    }

    args.headers[HttpConstants.CSRF_TOKEN_HEADER_NAME] = csrfToken;

    return args;
  }

  function encodeData(params: any) {
    let queryParams = Object.keys(params)
      .map(item => {
        let value = params[item] ? encodeURIComponent(params[item]) : "";
        return item + "=" + value;
      })
      .join("&");

    return queryParams;
  }

  function encodeQueryParams(params: any) {
    let queryParams = encodeData(params);

    return "?" + queryParams;
  }

  function encodeFormData(params: any) {
    let formData = encodeData(params).replace(/%20/g, "+");
    return formData;
  }

  function buildUrl(url: string, args: RequestArgs) {
    let _url = buildRequestPath(_baseUrl, url);
    if (args && args.params) {
      if (
        args.method === HttpConstants.HTTP_POST_METHOD ||
        args.method === HttpConstants.HTTP_PUT_METHOD
      ) {
        _url += encodeQueryParams(args.query || {});
      } else {
        _url += encodeQueryParams(
          Object.assign({}, args.params, args.query || {})
        );
      }
    }
    return _url;
  }

  async function checkStatus(response: Response) {
    let status = response.status;
    if (status >= 200 && status < 300) {
      return Promise.resolve(response);
    } else {
      if (status >= 400 && status < 500) {
        let error = await response.json();
        throw NetworkError({
          name: HTTP_ERROR_NAME,
          message: error.message,
          status,
          code: error.code,
          url: response.url
        });
      } else {
        throw NetworkError({
          name: HTTP_ERROR_NAME,
          status,
          code: HttpConstants.HTTP_SERVER_ERROR_CODE,
          message: HttpConstants.HTTP_SERVER_ERROR_MESSAGE,
          url: response.url
        });
      }
    }
  }

  function handleNetworkError(url: string, error: TNetworkError | string) {
    if (typeof error !== "string") {
      return NetworkError(error);
    }

    return NetworkError({
      name: HTTP_ERROR_NAME,
      status: 0,
      code: HttpConstants.HTTP_CLIENT_ERROR_CODE,
      message: error,
      url
    });
  }

  function buildRequestPath(...fragments: string[]) {
    return fragments
      .filter(fragment => fragment)
      .join("/")
      .replace(/(https?:\/\/)|(\/){2,}/g, "$1$2");
  }

  async function sendRequest(url: string, args: RequestArgs) {
    try {
      let _userAuth =
        args.authenticate !== undefined && args.authenticate !== undefined
          ? args.authenticate
          : true;

      let csrfToken = await _cookieStorageService.get(
        HttpConstants.CSRF_TOKEN_COOKIE_NAME
      );

      let response = await _http(
        buildUrl(url, args),
        buildRequestArguments(args, null, csrfToken)
      );
      await checkStatus(response);
      return response;
    } catch (error) {
      throw handleNetworkError(buildUrl(url, args), error);
    }
  }

  function setRequestHeader(args: RequestArgs, method: string) {
    args.method = method;
    return args;
  }

  async function sendFileRequest(url: string, method: string, data?: any) {
    let csrfToken = await _cookieStorageService.get(
      HttpConstants.CSRF_TOKEN_COOKIE_NAME
    );
    return new Promise((resolve, reject) => {
      let xhr = new XMLHttpRequest();
      xhr.open(method, url);

      xhr.setRequestHeader(HttpConstants.CSRF_TOKEN_HEADER_NAME, csrfToken);
      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          resolve(xhr.response);
        } else {
          reject(xhr.statusText);
        }
      };
      xhr.onerror = () => reject(xhr.statusText);
      xhr.send(data);
    });
  }

  return {
    async get(url: string, args?: RequestArgs) {
      return sendRequest(
        url,
        setRequestHeader(args || {}, HttpConstants.HTTP_GET_METHOD)
      );
    },
    async post(url: string, args?: RequestArgs) {
      return sendRequest(
        url,
        setRequestHeader(args || {}, HttpConstants.HTTP_POST_METHOD)
      );
    },
    async put(url: string, args?: RequestArgs) {
      return sendRequest(
        url,
        setRequestHeader(args || {}, HttpConstants.HTTP_PUT_METHOD)
      );
    },
    async remove(url: string, args?: RequestArgs) {
      return sendRequest(
        url,
        setRequestHeader(args || {}, HttpConstants.HTTP_DELETE_METHOD)
      );
    },
    async uploadFile(url: string, file: any, paramName: string) {
      let formData = new FormData();
      formData.append(paramName, file, file.name);
      return sendFileRequest(url, "PUT", formData);
    },
    async getFile(url: string) {
      return sendFileRequest(url, "GET");
    },
    toJSON(response: Response) {
      return response.json ? response.json() : Promise.resolve(response);
    },
    toText(response: Response) {
      return response.text
        ? response.text()
        : Promise.resolve(response.toString());
    },
    buildUrl(url: string, args: RequestArgs) {
      return buildUrl(url, args);
    },
    buildPath(...fragments: string[]) {
      return buildRequestPath(...fragments);
    },
    buildAbsolutePath(...fragments: string[]) {
      return buildRequestPath(_baseUrl, ...fragments);
    }
  };
};

export default HttpService;
