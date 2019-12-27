import Project, { IProject } from "../../model/project/Project";
import { IHttpService } from "../HttpService";

export interface IProjectService {
  getProject(id: number): Promise<IProject>;
}

const ProjectService = ({ httpService }): IProjectService => {
  const _http: IHttpService = httpService;
  const _basePath: string = "/api/project";

  return {
    async getProject(id: number) {
      const path = _http.buildPath(_basePath, id.toString());
      const response = await _http.get(path);
      const responseJSON = await _http.toJSON(response);
      return Project(responseJSON);
    }
  };
};

export default ProjectService;
