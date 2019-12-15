import Model from "../Model";
import ValidatableObject from "../validation/ValidatableObject";
import { IStatus } from "../status/Status";

export interface TTeamInviteResponse {
  roleKey: string;
  roleName: string;
  status: IStatus;
  teamId: number;
  teamName: string;
  userId: number;
}

export interface ITeamInviteResponse extends TTeamInviteResponse {}

const TeamInviteResponse = Model(
  (model: TTeamInviteResponse): ITeamInviteResponse => {
    const _teamInviteResponse: TTeamInviteResponse = Object.assign({}, model);

    let create = (
      teamInviteResponse: ITeamInviteResponse
    ): ITeamInviteResponse => {
      let obj = ValidatableObject(teamInviteResponse);
      return obj;
    };

    let teamInviteResponse = {
      get roleKey() {
        return _teamInviteResponse.roleKey;
      },
      get roleName() {
        return _teamInviteResponse.roleName;
      },
      get status() {
        return _teamInviteResponse.status;
      },
      get teamId() {
        return _teamInviteResponse.teamId;
      },
      get teamName() {
        return _teamInviteResponse.teamName;
      },
      get userId() {
        return _teamInviteResponse.userId;
      }
    };

    return create(teamInviteResponse);
  }
);

export default TeamInviteResponse;
