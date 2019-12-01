import { HttpConstants } from "../../common/Constants";

export interface TNetworkError {
  name: string;
  message: string;
  status: number;
  code: string;
  url: string;
}

const NetworkError = (error: TNetworkError) => {
  function Error(
    this: TNetworkError,
    { message, status, code, url }: TNetworkError
  ) {
    this.name = "Error";
    this.message = message;
    this.status = status;
    this.code = code || HttpConstants.HTTP_CLIENT_ERROR_CODE;
    this.url = url;
  }
  NetworkError.prototype = Object.create(Error.prototype);
  NetworkError.prototype.constructor = NetworkError;

  return new Error(error);
};

export default NetworkError;
