import Model from "../Model";
import ValidatableObject from "../validation/ValidatableObject";
import { IStatus } from "../status/Status";

export interface TTeamInvite {
  roleKey: string;
  roleName: string;
  status: IStatus;
  teamId: number;
  teamName: string;
  userId: number;
}

export interface ITeamInvite extends TTeamInvite {}

const TeamInvite = Model(
  (model: TTeamInvite): ITeamInvite => {
    const _TeamInvite: TTeamInvite = Object.assign({}, model);

    let create = (
      TeamInvite: ITeamInvite
    ): ITeamInvite => {
      let obj = ValidatableObject(TeamInvite);
      return obj;
    };

    let TeamInvite = {
      get roleKey() {
        return _TeamInvite.roleKey;
      },
      get roleName() {
        return _TeamInvite.roleName;
      },
      get status() {
        return _TeamInvite.status;
      },
      get teamId() {
        return _TeamInvite.teamId;
      },
      get teamName() {
        return _TeamInvite.teamName;
      },
      get userId() {
        return _TeamInvite.userId;
      }
    };

    return create(TeamInvite);
  }
);

export default TeamInvite;
