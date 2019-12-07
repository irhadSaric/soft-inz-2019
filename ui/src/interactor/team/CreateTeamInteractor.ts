import Application from "../../Application";
import { IRouter } from "../../runtime/Router";
import { ITeamService } from "../../service/team/TeamService";

export default class CreateTeamInteractor {
  private application: Application;
  private teamService: ITeamService;
  private router: IRouter;

  constructor({ application, teamService, router }) {
    this.application = application;
    this.teamService = teamService;
    this.router = router;
  }

  async execute(
    description: string,
    //logo: string,
    //nickname: string,
    teamName: string,
    userId: number
  ) {
    try {
      const response = await this.teamService.createTeam(
        description,
        //logo,
        //nickname,
        teamName,
        userId
      );
      //console.log(response);
      return response;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
}
