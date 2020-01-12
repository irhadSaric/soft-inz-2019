import withStore, { TPresentable, TLoadingAwarePresenter } from "../withStore";
import Application from "../../Application";
import { ITeamInvite } from "../../model/team/TeamInvite";

export interface TCreateTeamPresentationModel {
  description: string;
  logo: string;
  nickname: string;
  teamName: string;
  userId: number;
}

export interface TTeamInvitesPresenter extends TLoadingAwarePresenter {
  teamInvitesForUser: ITeamInvite[];
}

export interface ITeamInvitesPresenter
  extends TTeamInvitesPresenter,
    TPresentable {
  loadTeamInvitesForUser(teamInvitesForUser: ITeamInvite[]): void;
}

export interface TSelectValuePresentationModel {
  key: string;
  value: string;
}

const defaultState: TTeamInvitesPresenter = {
  teamInvitesForUser: []
};

const TeamInvitesPresenter = withStore<ITeamInvitesPresenter, TTeamInvitesPresenter>(
  ({ application, store, loader, translate }): ITeamInvitesPresenter => {
    const _store = store;
    const _application: Application = application;
    const state = _store.getState<
      TTeamInvitesPresenter & TLoadingAwarePresenter
    >();

    const loadTeamInvitesForUser = (teamInvitesForUser: ITeamInvite[]) => {
      return _store.update({
        teamInvitesForUser
      });
    };

    return {
      ...state,
      store: _store,
      loader,
      application: _application,
      translate,
      loadTeamInvitesForUser
    };
  },
  defaultState
);

export default TeamInvitesPresenter;
