import Application from "../../Application";
import { IProject } from "../../model/project/Project";
import { IProjectService } from "../../service/project/ProjectService";
import ProjectPresenter, {
  IProjectPresenter
} from "../../presenter/project/ProjectPresenter";
import { Moment } from "moment";

export default class ShowProjectInteractor {
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
        /* isCreateIterationModalVisible: false,
        iterationName: "",
        iterationDescription: "",
        iterationEndDate: {} as Moment */
      }
    });

    /*  this.projectService
      .getProject(projectId)
      .then(this.output && this.output.loadProject); */

    this.projectService
      .getProject(4)
      .then(this.output && this.output.loadProject);

    return this.output;
  }
}
