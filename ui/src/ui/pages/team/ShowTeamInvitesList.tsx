import * as React from "react";
import { ITeamInviteResponse } from "../../../model/team/TeamInviteResponse";
import { Input } from "antd";
import { IUser } from "../../../model/user/User";

const ShowTeamInvitesList = ({
  teamInvitesForUser,
  userProfile
}: {
  teamInvitesForUser: ITeamInviteResponse[];
  userProfile: IUser;
}) => {
  return (
    <div>
      <li>{userProfile.id}</li>
      {/* <Input value={teamInvitesForUser[0].teamId} /> */}
    </div>
  );
};

export default ShowTeamInvitesList;
