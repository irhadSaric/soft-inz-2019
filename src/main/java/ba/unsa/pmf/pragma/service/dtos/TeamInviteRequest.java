package ba.unsa.pmf.pragma.service.dtos;

/**
 * @author malek.chahin
 * November, 25, 2019.
 */
public class TeamInviteRequest {

    private Long userId;
    private Long invitedUserId;
    private Long teamId;

    public TeamInviteRequest() {
    }

    public TeamInviteRequest(Long userId, Long invitedUserId, Long teamId) {
        this.userId = userId;
        this.invitedUserId = invitedUserId;
        this.teamId = teamId;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Long getInvitedUserId() {
        return invitedUserId;
    }

    public void setInvitedUserId(Long invitedUserId) {
        this.invitedUserId = invitedUserId;
    }

    public Long getTeamId() {
        return teamId;
    }

    public void setTeamId(Long teamId) {
        this.teamId = teamId;
    }
}
