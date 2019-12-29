import * as React from "react";
import { ITeamInvite } from "../../../model/team/TeamInvite";
import { Popover, Button } from "antd";

const ShowTeamInvitesList = ({
  teamInvitesForUser,
  respondToPendingInvite
}: {
  teamInvitesForUser: ITeamInvite[];
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
      <Button type="danger">
        {team.teamName}
      </Button>
    </Popover>
  ));

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <h3>Team invites</h3>
      {listItems}
    </div>
  );
};

export default ShowTeamInvitesList;
