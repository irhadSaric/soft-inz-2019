import * as React from "react";
import { Menu, Dropdown, Icon } from "antd";
import { IActiveTeamList } from "../../../model/team/ActiveTeamList";

const renderActiveTeamList = (activeTeamList: IActiveTeamList[]) => {
  return (
    <Menu>
      {activeTeamList.map(activeTeam => (
        <Menu.Item key={activeTeam.teamId}>{activeTeam.teamName}</Menu.Item>
      ))}
    </Menu>
  );
};

const ActiveTeamListComponent = ({
  translate,
  activeTeamList
}: {
  translate: any;
  activeTeamList: IActiveTeamList[];
}) => {
  return (
    <Dropdown
      overlay={renderActiveTeamList(activeTeamList)}
      trigger={["click"]}
    >
      <a className="ant-dropdown-link" href="#">
        Active team list <Icon type="down" />
      </a>
    </Dropdown>
  );
};

export default ActiveTeamListComponent;
