import { IHttpService } from "../HttpService";
import Team, { ITeam } from "../../model/team/Team";
import TeamInviteResponse, {
  ITeamInviteResponse
} from "../../model/team/TeamInviteResponse";

export interface ITeamService {
  createTeam(
    description: string,
    //logo: string,
    //nickname: string,
    teamName: string,
    userId: number
  ): Promise<any>;
  inviteUserToTeam(
    invitedUserId: number,
    teamId: number,
    userId: number
  ): Promise<any>;
  getAllTeamsForUser(userId: number): Promise<ITeam[]>;
  getAllTeams(): Promise<ITeam[]>;
  getTeamInvitesForUser(userId: number): Promise<ITeamInviteResponse[]>;
}

const TeamService = ({ httpService }): ITeamService => {
  const _http: IHttpService = httpService;
  const _basePath: string = "/api/teams";
  const _createTeam: string = "/create-team";
  const _invite: string = "/invite";
  const _all: string = "/all";
  const _pending: string = "/pending";

  const buildTeamList = (data: any): ITeam[] => {
    return data.map(item => Team(item));
  };

  const buildTeamInvitesList = (data: any): ITeamInviteResponse[] => {
    return data.map(item => TeamInviteResponse(item));
  };

  return {
    async createTeam(
      description: string,
      //logo: string,
      //nickname: string,
      teamName: string,
      userId: number
    ) {
      const path = _http.buildPath(_basePath, _createTeam);
      const response = await _http.post(path, {
        params: {
          description,
          //logo,
          //nickname,
          teamName,
          userId
        }
      });
      return _http.toJSON(response);
    },
    async inviteUserToTeam(
      invitedUserId: number,
      teamId: number,
      userId: number
    ) {
      const path = _http.buildPath(_basePath, _invite);
      const response = await _http.post(path, {
        params: {
          invitedUserId,
          teamId,
          userId
        }
      });
      return _http.toText(response); // test
    },
    async getAllTeamsForUser(userId: number) {
      const path = _http.buildPath(_basePath, _all, userId.toString());
      const response = await _http.get(path);
      const responseJSON = await _http.toJSON(response);
      return buildTeamList(responseJSON);
    },
    async getAllTeams() {
      const path = _http.buildPath(_basePath, _all);
      const response = await _http.get(path);
      const responseJSON = await _http.toJSON(response);
      return buildTeamList(responseJSON);
    },
    async getTeamInvitesForUser(userId: number) {
      const path = _http.buildPath(_basePath, _pending, userId.toString());
      const response = await _http.get(path);
      const responseJSON = await _http.toJSON(response);
      return buildTeamInvitesList(responseJSON);
    }
  };
};

export default TeamService;
