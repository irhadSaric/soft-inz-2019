import Application from "../../Application";
import { IProject } from "../../model/project/Project";
import { IProjectService } from "../../service/project/ProjectService";
/*
export default class ShowTeamInteractor {
  private application: Application;
  // private output?: IProjectPresenter;
  private projectService: IProjectService;

  constructor({ application, projectService }: any) {
    this.application = application;
    this.projectService = projectService;
  }

     execute() {
    this.output = ProjectPresenter({
      application: this.application,
      initialState: {
        project: {} as IProject,
        isEditableForm: false,
        editButtonDisabled: false
      }
    });

    this.projectService
      .getProject(4)
      .then(this.output && this.output.loadProject);

    return this.output; 
  }
}*/
