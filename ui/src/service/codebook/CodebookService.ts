import { IHttpService } from "../HttpService";
import Country, { ICountry } from "../../model/country/Country";

export interface ICodebookService {
  getCountries(): Promise<ICountry[]>;
}

const CodebookService = ({ httpService }): ICodebookService => {
  const _http: IHttpService = httpService;
  const _basePath = "/api";
  const _codebooksPath = "/codebooks";
  const _countriesPath = "/countries/all";

  let CountryListMapper = (json = []) => {
    return json.map((item: any) => Country(item));
  };

  return {
    async getCountries() {
      const path = _http.buildPath(_basePath, _codebooksPath, _countriesPath);
      const response = await _http.get(path);
      const responseJSON = await _http.toJSON(response);
      return CountryListMapper(responseJSON);
    }
  };
};

export default CodebookService;
