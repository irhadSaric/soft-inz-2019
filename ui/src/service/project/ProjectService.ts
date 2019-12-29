import Project, { IProject } from "../../model/project/Project";
import { IHttpService } from "../HttpService";
import Text from "antd/lib/typography/Text";

export interface IProjectService {
  getProject(id: number): Promise<IProject>;
  updateProject(project: IProject): Promise<any>;
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
    },

    async updateProject(project: IProject) {
      const path = _http.buildPath(_basePath, project.id.toString());
      const response = await _http.put(path, {
        params: {
          name: project.name,
          description: project.description,
          id: project.team.id,
          endDate: project.endDate,
          status: project.status
        }
      });
      const responseJSON = await _http.toJSON(response);
      return Project(responseJSON);
    }
  };
};

export default ProjectService;
