import { IHttpService } from "../HttpService";
import Team, { ITeam } from "../../model/team/Team";
import ActiveTeamList, {
  IActiveTeamList
} from "../../model/team/ActiveTeamList";

export interface ITeamService {
  createTeam(
    description: string,
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
  getActiveTeamList(userId: number): Promise<IActiveTeamList[]>;
}

const TeamService = ({ httpService }): ITeamService => {
  const _http: IHttpService = httpService;
  const _basePath: string = "/api/teams";
  const _createTeam: string = "/create-team";
  const _invite: string = "/invite";
  const _all: string = "/all";
  const _active: string = "/active";

  const buildTeamList = (data: any): ITeam[] => {
    return data.map(item => Team(item));
  };

  const buildActiveTeamList = (data: any): IActiveTeamList[] => {
    return data.map(item => ActiveTeamList(item));
  };

  return {
    async createTeam(description: string, teamName: string, userId: number) {
      const path = _http.buildPath(_basePath, _createTeam);
      const response = await _http.post(path, {
        params: {
          description,
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
      return _http.toText(response);
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
    async getActiveTeamList(userId: number) {
      const path = _http.buildPath(_basePath, _active, userId.toString());
      const response = await _http.get(path);
      const responseJSON = await _http.toJSON(response);
      return buildActiveTeamList(responseJSON);
    }
  };
};

export default TeamService;
