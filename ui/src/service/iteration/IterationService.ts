import { IHttpService } from "../HttpService";
import Iteration, { IIteration } from "../../model/iteration/Iteration";
import Status from "../../model/status/Status";
import IterationTickets, {
  IIterationTickets
} from "../../model/iteration/IterationTickets";

export interface IIterationService {
  getAllIterations(iterationId: number): Promise<IIteration>;
  getAllIterationTickets(iterationId: number): Promise<IIterationTickets[]>;
}

const IterationService = ({ httpService }): IIterationService => {
  const _http: IHttpService = httpService;
  const _basePath: string = "/api/iteration";
  const _get: string = "/get";
  const _tickets: string = "/tickets";

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
    }
  };
};

export default IterationService;
