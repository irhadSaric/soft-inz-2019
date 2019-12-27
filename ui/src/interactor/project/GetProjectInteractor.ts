import { IProjectService } from "../../service/project/ProjectService";
import CheckLoginStatusInteractor from "../authentication/CheckLoginStatusInteractor";

export default class GetProjectInteractor {
  private projectService: IProjectService;

  constructor({ projectService }: any) {
    this.projectService = projectService;
  }

  async execute(id: number) {
    return this.projectService.getProject(id);
  }
}
