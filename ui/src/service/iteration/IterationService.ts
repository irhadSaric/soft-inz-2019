import { IHttpService } from "../HttpService";
import Iteration, { IIteration } from "../../model/iteration/Iteration";

export interface IIterationService {
  getAllIterations(iterationId: number): Promise<IIteration>;
}

const IterationService = ({ httpService }): IIterationService => {
  const _http: IHttpService = httpService;
  const _basePath: string = "/api/iteration";
  const _get: string = "/get";

  const buildTeamList = (data: any): IIteration => {
    return data.map(item => Iteration(item));
  };

  return {
    async getAllIterations(iterationId: number) {
      const path = _http.buildPath(_basePath, _get, iterationId.toString());
      const response = await _http.get(path);
      const responseJSON = await _http.toJSON(response);
      return buildTeamList(responseJSON);
    }
  };
};

export default IterationService;
