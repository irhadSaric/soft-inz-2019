import * as React from "react";
import { ITeamInviteResponse } from "../../../model/team/TeamInviteResponse";
import { Input, Divider, Popover, Button } from "antd";
import { IUser } from "../../../model/user/User";

const ShowTeamInvitesList = ({
  teamInvitesForUser,
  respondToPendingInvite
}: {
  teamInvitesForUser: ITeamInviteResponse[];
  respondToPendingInvite(userId: number, teamId: number, accept: boolean): void;
}) => {
  const listItems = teamInvitesForUser.map(team => (
    <Popover
      content={
        <div>
          <a
            onClick={e => {
              respondToPendingInvite(team.userId, team.teamId, true);
            }}
          >
            Yes
          </a>
          <a
            onClick={e => {
              respondToPendingInvite(team.userId, team.teamId, false);
            }}
            style={{ float: "right" }}
          >
            No
          </a>
        </div>
      }
      title="Do you want to join this team?"
    >
      <Button type="danger" style={{ marginTop: 20 }}>
        {team.teamName}
      </Button>
    </Popover>
  ));

  return (
    <div style={{ display: "flex", flexDirection: "column", height: 336 }}>
      <h2>TEAM INVITES</h2>
      {listItems}
    </div>
  );
};

export default ShowTeamInvitesList;
