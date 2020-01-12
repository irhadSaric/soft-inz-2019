import { IHttpService } from "../HttpService";
import Iteration, { IIteration } from "../../model/iteration/Iteration";
import Status from "../../model/status/Status";
import IterationTickets, {
  IIterationTickets
} from "../../model/iteration/IterationTickets";

export interface IIterationService {
  getAllIterations(iterationId: number): Promise<IIteration>;
  getAllIterationTickets(iterationId: number): Promise<IIterationTickets[]>;
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
  const _get: string = "/get";
  const _tickets: string = "/tickets";
  const _createPath: string = "/create";
  const _editPath: string = "/edit";
  const _getPath: string = "/get";

  let buildProjectList = (json: any): IIterationTickets[] => {
    return json.map(item => {
      let iterationTickets = IterationTickets(item);
      iterationTickets.startDate = new Date(item.startDate);
      iterationTickets.endDate = new Date(item.endDate);
      iterationTickets.status = Status(item.statusId);
      return iterationTickets;
    });
  };

  return {
    async getIteration(id: number) {
      const path = _http.buildPath(_basePath, id.toString());
      const response = await _http.get(path);
      const responseJSON = await _http.toJSON(response);
      return Iteration(responseJSON);
    },
    async getAllIterations(iterationId: number) {
      const path = _http.buildPath(_basePath, _get, iterationId.toString());
      const response = await _http.get(path);
      const responseJSON = await _http.toJSON(response);
      return Iteration(responseJSON);
    },
    async getAllIterationTickets(iterationId: number) {
      const path = _http.buildPath(_basePath, iterationId.toString(), _tickets);
      const response = await _http.get(path);
      const responseJSON = await _http.toJSON(response);
      return buildProjectList(responseJSON);
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
