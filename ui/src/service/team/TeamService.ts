import { IHttpService } from "../HttpService";
import Team, { ITeam } from "../../model/team/Team";
import TeamInvite, { ITeamInvite } from "../../model/team/TeamInvite";
import TeamDetails, { ITeamDetails } from "../../model/team/TeamDetails";

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
  getTeamInvitesForUser(userId: number): Promise<ITeamInvite[]>;
  getTeamDetails(teamId: number): Promise<ITeamDetails>;
  updateTeamDetails(team: ITeam): Promise<any>;
  respondToPendingInvite(
    userId: number,
    teamId: number,
    accept: boolean
  ): Promise<any>;
}

const TeamService = ({ httpService }): ITeamService => {
  const _http: IHttpService = httpService;
  const _basePath: string = "/api/teams";
  const _createTeam: string = "/create-team";
  const _invite: string = "/invite";
  const _all: string = "/all";
  const _pending: string = "/pending";
  const _respond: string = "/respond";
  const _details: string = "/details";
  const _edit: string = "/edit";

  const buildTeamList = (data: any): ITeam[] => {
    return data.map(item => Team(item));
  };

  const buildTeamInvitesList = (data: any): ITeamInvite[] => {
    return data.map(item => TeamInvite(item));
  };

  const buildTeamDetailsList = (data: any): ITeamDetails[] => {
    return data.map(item => TeamDetails(item));
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
    async getTeamInvitesForUser(userId: number) {
      const path = _http.buildPath(_basePath, _pending, userId.toString());
      const response = await _http.get(path);
      const responseJSON = await _http.toJSON(response);
      return buildTeamInvitesList(responseJSON);
    },
    async getTeamDetails(teamId: number) {
      const path = _http.buildPath(_basePath, teamId.toString(), _details);
      const response = await _http.get(path);
      const responseJSON = await _http.toJSON(response);
      return TeamDetails(responseJSON);
    },
    async updateTeamDetails(team: ITeam) {
      const path = _http.buildPath(_basePath, team.id.toString(), _edit);
      _http.put(path, {
        params: {
          id: team.id,
          name: team.name,
          description: team.description,
          creationDate: team.creationDate,
          lastUpdated: team.lastUpdated
        }
      });
    },
    async respondToPendingInvite(
      userId: number,
      teamId: number,
      accept: boolean
    ) {
      let query: string = "?accept=";
      accept ? (query += "true") : (query += "false");
      const path = _http.buildPath(
        _basePath,
        _pending,
        userId.toString(),
        _respond,
        teamId.toString(),
        query
      );
      const response = await _http.post(path);
      return _http.toText(response);
    }
  };
};

export default TeamService;
