import Application from "../../Application";
import { IProject } from "../../model/project/Project";
import { IProjectService } from "../../service/project/ProjectService";
import ProjectPresenter, {
  IProjectPresenter
} from "../../presenter/project/ProjectPresenter";

export default class ShowTeamInteractor {
  private application: Application;
  private output?: IProjectPresenter;
  private projectService: IProjectService;

  constructor({ application, projectService }: any) {
    this.application = application;
    this.projectService = projectService;
  }

  execute(projectId: number) {
    this.output = ProjectPresenter({
      application: this.application,
      initialState: {
        project: {} as IProject,
        isEditableForm: false,
        editButtonDisabled: false
      }
    });

    this.projectService
      .getProject(projectId)
      .then(this.output && this.output.loadProject);

    return this.output;
  }
}
