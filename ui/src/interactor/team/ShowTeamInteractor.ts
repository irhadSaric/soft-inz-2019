import Application from "../../Application";
import TeamPresenter, {
  ITeamPresenter
} from "../../presenter/team/TeamPresenter";
import { ITeamDetails } from "../../model/team/TeamDetails";
import { ITeamService } from "../../service/team/TeamService";
import { ITeamProject } from "../../model/team/TeamProject";

export default class ShowTeamInteractor {
  private application: Application;
  private output?: ITeamPresenter;
  private teamService: ITeamService;

  constructor({ application, teamService }: any) {
    this.application = application;
    this.teamService = teamService;
  }

  execute(teamId: number) {
    this.output = TeamPresenter({
      application: this.application,
      initialState: {
        teamDetails: {} as ITeamDetails,
        teamProjects: [],
        isEditableForm: false,
        editButtonDisabled: false,
        activeTeamMembers: []
      }
    });

    this.teamService
      .getTeamDetails(teamId)
      .then(this.output && this.output.loadTeamDetails);

    this.teamService
      .getTeamProjects(teamId)
      .then(this.output && this.output.loadTeamProjects);

    this.teamService
      .getActiveTeamMembersList(teamId)
      .then(this.output && this.output.loadActiveTeamMembersList);

    return this.output;
  }
}
