import Project, { IProject } from "../../model/project/Project";
import { IHttpService } from "../HttpService";
import { IStatus } from "../../model/status/Status";

export interface IProjectService {
  getProject(id: number): Promise<IProject>;
  updateProject(project: IProject): Promise<any>;
  createProject(
    description: string,
    endDate: Date,
    name: string,
    teamId: number
  ): Promise<any>;
}

const ProjectService = ({ httpService }): IProjectService => {
  const _http: IHttpService = httpService;
  const _basePath: string = "/api/project";
  const _createPath: string = "/create";
  const _editPath: string = "/edit";

  return {
    async getProject(id: number) {
      const path = _http.buildPath(_basePath, id.toString());
      const response = await _http.get(path);
      const responseJSON = await _http.toJSON(response);
      let project = Project(responseJSON);
      console.log(project);
      //project.status = responseJSON.statusId;
      return Project(responseJSON);
    },

    async updateProject(project: IProject) {
      const path = _http.buildPath(_basePath, _editPath, project.id.toString());
      console.log(project);
      const response = await _http.put(path, {
        params: {
          name: project.name,
          description: project.description,
          teamId: project.team.id,
          endDate: project.endDate,
          status: project.statusId
        }
      });
      console.log(project.statusId);
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
    }
  };
};

export default ProjectService;
