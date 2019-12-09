package ba.unsa.pmf.pragma.service.dtos;

import java.util.Date;

public class CreateProjectRequest {
    private String description;
    private Date endDate;
    private String name;
    private Long teamId;

    public CreateProjectRequest() {
    }

    public CreateProjectRequest(String description, Date endDate, String name, Long teamId) {
        this.description = description;
        this.endDate = endDate;
        this.name = name;
        this.teamId = teamId;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Date getEndDate() {
        return endDate;
    }

    public void setEndDate(Date endDate) {
        this.endDate = endDate;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Long getTeamId() {
        return teamId;
    }

    public void setTeamId(Long teamId) {
        this.teamId = teamId;
    }
}
