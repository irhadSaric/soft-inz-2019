import Application from "../../Application";
import { IProject } from "../../model/project/Project";
import { IProjectService } from "../../service/project/ProjectService";
import ProjectPresenter, {
  IProjectPresenter
} from "../../presenter/project/ProjectPresenter";
import { Moment } from "moment";
import { IIteration } from "../../model/iteration/Iteration";

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
        editButtonDisabled: false,
        isCreateIterationModalVisible: false,
        iteration: {} as IIteration,
        projectId,
        activeIteration: {} as IIteration,
        completedIterations: []
      }
    });

    this.projectService
      .getProject(projectId)
      .then(this.output && this.output.loadProject);

    this.projectService
      .getActiveIterationForProject(projectId)
      .then(this.output && this.output.loadActiveIteration);

    this.projectService
      .getCompletedIterationsForProject(projectId)
      .then(this.output && this.output.loadCompletedIterations);

    return this.output;
  }
}
