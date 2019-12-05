import { IHttpService } from "../HttpService";

export interface ITeamService {
  createTeam(
    description: string,
    logo: string,
    nickname: string,
    teamName: string,
    userId: number
  ): Promise<any>;
}

const TeamService = ({ httpService }): ITeamService => {
  const _http: IHttpService = httpService;
  const _basePath: string = "/api/teams";
  const _createTeam: string = "/create-team";

  return {
    async createTeam(
      description: string,
      logo: string,
      nickname: string,
      teamName: string,
      userId: number
    ) {
      const path = _http.buildPath(_basePath, _createTeam);
      const response = await _http.post(path, {
        params: {
          description,
          logo,
          nickname,
          teamName,
          userId
        }
      });
      return _http.toText(response);
    }
  };
};

export default TeamService;
