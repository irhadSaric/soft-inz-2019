import { IHttpService, RequestArgs } from "./HttpService";
import ICacheManager from "../model/runtime/cache/ICacheManager";
import { HttpConstants } from "../common/Constants";

export interface TCachingHttpServiceOptions {
  name: string;
  timeToLive?: number;
}

const CachingHttpService = ({
  http,
  cacheManager,
  options
}: {
  http: IHttpService;
  cacheManager: ICacheManager;
  options: TCachingHttpServiceOptions;
}): IHttpService => {
  const _http: IHttpService = http;
  if (!options) {
    return http;
  }
  let _cache = cacheManager.createCache(options.name, options.timeToLive);

  function cacheResponse(response: Response) {
    let _response = response.clone();
    const contentTypeHeader = response.headers.get(
      HttpConstants.CONTENT_TYPE_HEADER_NAME
    );
    let readBodyPromise =
      contentTypeHeader !== null &&
      contentTypeHeader.startsWith(HttpConstants.JSON_CONTENT_TYPE)
        ? response.json()
        : response.text();
    return readBodyPromise.then(data => {
      let url = new URL(response.url);
      const name = `${url.pathname}${url.search}`;
      return _cache.put(name, data).then(() => {
        return _response;
      });
    });
  }

  function retrieveIfAbsent(url: string, request: (...args: any[]) => any) {
    return _cache.computeIfAbsent<Response>(url, request, new Date());
  }

  return {
    async get(url: string, args?: RequestArgs) {
      let request = () => _http.get(url, args).then(cacheResponse);
      return retrieveIfAbsent(_http.buildUrl(url, args), request);
    },
    async post(url: string, args?: RequestArgs) {
      const result = await _http.post(url, args);
      await _cache.invalidate();
      return result;
    },
    async put(url: string, args?: RequestArgs) {
      const result = await _http.put(url, args);
      await _cache.invalidate();
      return result;
    },
    async remove(url: string, args?: RequestArgs) {
      const result = await _http.remove(url, args);
      await _cache.invalidate();
      return result;
    },
    async uploadFile(url: string, file: any, paramName: string) {
      const result = await _http.uploadFile(url, file, paramName);
      await _cache.invalidate();
      return result;
    },
    async getFile(url: string) {
      return _http.getFile(url);
    },
    toJSON(response: Response) {
      return _http.toJSON(response);
    },
    toText(response: Response) {
      return _http.toText(response);
    },
    buildPath(...fragments: string[]) {
      return _http.buildPath(...fragments);
    },
    buildAbsolutePath(...fragments: string[]) {
      return _http.buildAbsolutePath(...fragments);
    },
    buildUrl(url: string, args?: RequestArgs) {
      return _http.buildUrl(url, args);
    }
  };
};

export default CachingHttpService;
