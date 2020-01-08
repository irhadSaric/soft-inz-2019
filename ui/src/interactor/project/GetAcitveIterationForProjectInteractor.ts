import { IProjectService } from "../../service/project/ProjectService";

export default class GetActiveIterationForProjectInteractor {
  private projectService: IProjectService;

  constructor({ projectService }: any) {
    this.projectService = projectService;
  }

  async execute(projectId: number) {
    return this.projectService.getActiveIterationForProject(projectId);
  }
}
