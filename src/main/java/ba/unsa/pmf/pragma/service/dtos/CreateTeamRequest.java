package ba.unsa.pmf.pragma.service.dtos;

import javax.validation.constraints.NotNull;

public class CreateTeamRequest {
    @NotNull
    Long userId;

    byte[] logo;

    @NotNull
    String teamName;

    String description;

    public CreateTeamRequest(){}

    public CreateTeamRequest(Long userId, byte[] logo, String teamName, String description) {
        this.userId = userId;
        this.logo = logo;
        this.teamName = teamName;
        this.description = description;
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
}
