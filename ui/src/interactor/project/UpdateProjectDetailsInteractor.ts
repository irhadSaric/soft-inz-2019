import Application from "../../Application";
import { IProject } from "../../model/project/Project";
import { IProjectService } from "../../service/project/ProjectService";

export default class UpdateProjectDetailsInteractor {
  private application: Application;
  private projectService: IProjectService;

  constructor({ application, projectService }) {
    this.application = application;
    this.projectService = projectService;
  }

  async execute(project: IProject) {
    try {
      return await this.projectService.updateProject(project);
    } catch (error) {
      console.log(error);
      return error;
    }
  }
}
