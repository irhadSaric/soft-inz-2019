import Project, { IProject } from "../../model/project/Project";
import { IHttpService } from "../HttpService";
import Status, { IStatus } from "../../model/status/Status";
import Iteration, { IIteration } from "../../model/iteration/Iteration";

export interface IProjectService {
  getProject(id: number): Promise<IProject>;
  updateProject(project: IProject): Promise<any>;
  createProject(
    description: string,
    endDate: Date,
    name: string,
    teamId: number
  ): Promise<any>;
  getActiveIterationForProject(projectId: number): Promise<IIteration>;
  getCompletedIterationsForProject(projectId: number): Promise<IIteration[]>;
}

let buildIterationsList = (json: any): IIteration[] => {
  return json.map(item => {
    let iterations = Iteration(item);
    iterations.startDate = new Date(item.startDate);
    iterations.endDate = new Date(item.endDate);
    iterations.project = Project(item.project);
    iterations.status = Status(item.status);
    return iterations;
  });
};

const ProjectService = ({ httpService }): IProjectService => {
  const _http: IHttpService = httpService;
  const _basePath: string = "/api/project";
  const _createPath: string = "/create";
  const _editPath: string = "/edit";
  const _iterationsPath: string = "/iterations";
  const _activePath: string = "/active";
  const _completedPath: string = "/completed";

  return {
    async getProject(id: number) {
      const path = _http.buildPath(_basePath, id.toString());
      const response = await _http.get(path);
      const responseJSON = await _http.toJSON(response);
      return Project(responseJSON);
    },

    async updateProject(project: IProject) {
      const path = _http.buildPath(_basePath, _editPath, project.id.toString());
      const response = await _http.put(path, {
        params: {
          name: project.name,
          description: project.description,
          teamId: project.team.id,
          endDate: project.endDate,
          status: project.statusId
        }
      });
      const responseJSON = await _http.toJSON(response);
      return Project(responseJSON);
    },

    async createProject(
      description: string,
      endDate: Date,
      name: string,
      teamId: number
    ) {
      const path = _http.buildPath(_basePath, _createPath);
      const response = await _http.post(path, {
        params: {
          description,
          endDate,
          name,
          teamId
        }
      });
      return _http.toJSON(response);
    },
    async getActiveIterationForProject(projectId: number) {
      const path = _http.buildPath(
        _basePath,
        _iterationsPath,
        projectId.toString(),
        _activePath
      );
      const response = await _http.get(path);
      try {
        const responseJSON = await _http.toJSON(response);
        return Iteration(responseJSON);
      } catch {
        const iteration = {} as IIteration;
        return iteration;
      }
    },
    async getCompletedIterationsForProject(projectId: number) {
      const path = _http.buildPath(
        _basePath,
        _iterationsPath,
        projectId.toString(),
        _completedPath
      );
      const response = await _http.get(path);
      const responseJSON = await _http.toJSON(response);
      return buildIterationsList(responseJSON);
    }
  };
};

export default ProjectService;
