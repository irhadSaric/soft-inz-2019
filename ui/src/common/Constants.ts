const BaseConstants = {
  TRUE: "D",
  FALSE: "N"
};

const UserPreferences = {
  DEFAULT_LANGUAGE: "en"
};

const HttpConstants = {
  HTTP_GET_METHOD: "get",
  HTTP_POST_METHOD: "post",
  HTTP_PUT_METHOD: "put",
  HTTP_DELETE_METHOD: "delete",
  JSON_CONTENT_TYPE: "application/json",
  FORM_CONTENT_TYPE: "application/x-www-form-urlencoded",
  MULTIPART_CONTENT_TYPE: "multipart/form-data",
  AUTH_HEADER: "Authorization",
  HTTP_CLIENT_ERROR_CODE: "CLIENT_ERROR",
  HTTP_SERVER_ERROR_CODE: "SERVER_ERROR",
  HTTP_SERVER_ERROR_MESSAGE: "HTTP_ERROR",
  CONTENT_TYPE_HEADER_NAME: "Content-Type",
  SESSION_ID_HEADER: "session-id",
  CSRF_TOKEN_HEADER_NAME: "X-XSRF-TOKEN",
  CSRF_TOKEN_COOKIE_NAME: "XSRF-TOKEN"
};

const RouteTypes = {
  ROOT: "root",
  SINGLETON: "singleton",
  TRANSIENT: "transient",
  REGULAR: "regular"
};

const Layouts = {
  DEFAULT: "app",
  ROOT: "root",
  APP: "app",
  BASE: "base"
};

const Topics = {
  DEFAULT: "app"
};

const Errors = {
  ERROR: "Error",
  VERIFICATION_REQUIRED: "verification-required",
  LOGIN_ERROR: "login-error",
  INVALID_CODE: "invalid-code",
  FORBIDDEN_STATUS: 403
};

const DateFormats = {
  DATE: "DD.MM.YYYY",
  TIME: "kk:mm",
  ORIGINAL_DATE: "MM.DD.YYYY",
  DATETIME_LOCAL: "DD.MM.YYYY kk:mm:ss"
};

const StorageKeys = {
  USERNAME: "username",
  PASSWORD: "password",
  EMAIL: "email"
};

export { Topics };
export { Layouts };
export { RouteTypes };
export { UserPreferences };
export { HttpConstants };
export { BaseConstants };
export { Errors };
export { DateFormats };
export { StorageKeys };
