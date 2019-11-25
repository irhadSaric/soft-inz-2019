package ba.unsa.pmf.pragma.service.dtos;

import ba.unsa.pmf.pragma.db.entity.Status;

/**
 * @author malek.chahin
 * November, 25, 2019.
 */
public class TeamInviteResponse {

    private Long userId;
    private Long teamId;
    private String roleName;
    private String roleKey;
    private Status status;

    public TeamInviteResponse() {
    }

    public TeamInviteResponse(Long userId, Long teamId, String roleName, String roleKey, Status status) {
        this.userId = userId;
        this.teamId = teamId;
        this.roleName = roleName;
        this.roleKey = roleKey;
        this.status = status;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Long getTeamId() {
        return teamId;
    }

    public void setTeamId(Long teamId) {
        this.teamId = teamId;
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
