package ba.unsa.pmf.pragma.service.dtos;

import ba.unsa.pmf.pragma.db.entity.Status;

/**
 * @author malek.chahin
 * November, 24, 2019.
 */
public class UserTeamResponse {

    private String nickname;
    private String roleName;
    private String roleKey;
    private String teamName;
    private String teamDescription;
    private Status status;
    private Long teamId;

    public UserTeamResponse() {
    }

    public UserTeamResponse(String nickname, String roleName, String roleKey, String teamName, String teamDescription, Status status,Long teamId) {
        this.nickname = nickname;
        this.roleName = roleName;
        this.roleKey = roleKey;
        this.teamName = teamName;
        this.teamDescription = teamDescription;
        this.status = status;
        this.teamId = teamId;
    }

    public Long getTeamId() {
        return teamId;
    }

    public void setTeamId(Long teamId) {
        this.teamId = teamId;
    }

    public String getNickname() {
        return nickname;
    }

    public void setNickname(String nickname) {
        this.nickname = nickname;
    }

    public String getTeamName() {
        return teamName;
    }

    public void setTeamName(String teamName) {
        this.teamName = teamName;
    }

    public String getTeamDescription() {
        return teamDescription;
    }

    public void setTeamDescription(String teamDescription) {
        this.teamDescription = teamDescription;
    }

    public String getRoleName() {
        return roleName;
    }

    public void setRoleName(String roleName) {
        this.roleName = roleName;
    }

    public String getRoleKey() {
        return roleKey;
    }

    public void setRoleKey(String roleKey) {
        this.roleKey = roleKey;
    }

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }
}
