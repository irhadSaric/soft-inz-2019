package ba.unsa.pmf.pragma.service.dtos;

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
//    TODO add team members in this response


    public UserTeamResponse() {
    }

    public UserTeamResponse(String nickname, String roleName, String roleKey, String teamName, String teamDescription) {
        this.nickname = nickname;
        this.roleName = roleName;
        this.roleKey = roleKey;
        this.teamName = teamName;
        this.teamDescription = teamDescription;
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
}
