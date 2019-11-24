package ba.unsa.pmf.pragma.service.dtos;

import javax.validation.constraints.NotNull;

public class CreateTeamRequest {

    @NotNull
    private Long userId;

    private byte[] logo;

    @NotNull
    private String teamName;

    @NotNull
    private String description;

    private String nickname;

    public CreateTeamRequest() {

    }

    public CreateTeamRequest(@NotNull Long userId, byte[] logo, @NotNull String teamName, @NotNull String description, String nickname) {
        this.userId = userId;
        this.logo = logo;
        this.teamName = teamName;
        this.description = description;
        this.nickname = nickname;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public byte[] getLogo() {
        return logo;
    }

    public void setLogo(byte[] logo) {
        this.logo = logo;
    }

    public String getTeamName() {
        return teamName;
    }

    public void setTeamName(String teamName) {
        this.teamName = teamName;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getNickname() {
        return nickname;
    }

    public void setNickname(String nickname) {
        this.nickname = nickname;
    }
}
