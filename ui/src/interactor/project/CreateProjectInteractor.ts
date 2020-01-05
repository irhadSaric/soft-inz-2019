import { IProjectService } from "../../service/project/ProjectService";
import { IStatus } from "../../model/status/Status";

export default class CreateProjectInteractor {
  private projectService: IProjectService;

  constructor({ projectService }) {
    this.projectService = projectService;
  }

  async execute(
    description: string,
    endDate: Date,
    name: string,
    teamId: number
  ) {
    try {
      return this.projectService.createProject(
        description,
        endDate,
        name,
        teamId
      );
    } catch (error) {
      console.log(error);
      return error;
    }
  }
}
