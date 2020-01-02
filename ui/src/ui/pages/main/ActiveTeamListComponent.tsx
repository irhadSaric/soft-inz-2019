import * as React from "react";
import { Select } from "antd";
import { IActiveTeam } from "../../../model/team/ActiveTeam";

const { Option } = Select;

const ActiveTeamListComponent = ({
  translate,
  activeTeamList,
  showTeamPage
}: {
  translate: any;
  activeTeamList: IActiveTeam[];
  showTeamPage: any;
}) => {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <h3>Active team list</h3>
      <Select style={{ width: 150 }} onChange={showTeamPage} placeholder={"Choose active team"}>
        {activeTeamList.map(activeTeam => <Option value={activeTeam.teamId}>{activeTeam.teamName}</Option>)}
      </Select>
    </div>

  );
};

export default ActiveTeamListComponent;
