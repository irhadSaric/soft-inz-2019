import { IHttpService } from "../HttpService";
import Iteration, { IIteration } from "../../model/iteration/iteration";
import { createInflateRaw } from "zlib";

export interface IIterationService {
  getIteration(id: number): Promise<IIteration>;
  createIteration(
    description: string,
    endDate: Date,
    name: string,
    projectId: number
  ): Promise<any>;
}

const IterationService = ({ httpService }): IIterationService => {
  const _http: IHttpService = httpService;
  const _basePath: string = "/api/iteration";
  const _createPath: string = "/create";
  const _editPath: string = "/edit";
  const _getPath: string = "/get";

  return {
    async getIteration(id: number) {
      const path = _http.buildPath(_basePath, id.toString());
      const response = await _http.get(path);
      const responseJSON = await _http.toJSON(response);
      return Iteration(responseJSON);
    },

    async createIteration(
      description: string,
      endDate: Date,
      name: string,
      projectId: number
    ) {
      const path = _http.buildPath(_basePath, _createPath);
      const response = await _http.post(path, {
        params: {
          description,
          endDate,
          name,
          projectId
        }
      });
      return _http.toJSON(response);
    }
  };
};

export default IterationService;
