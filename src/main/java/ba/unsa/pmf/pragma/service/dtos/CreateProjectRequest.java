package ba.unsa.pmf.pragma.service.dtos;

import ba.unsa.pmf.pragma.db.entity.Status;

import java.util.Date;

public class CreateProjectRequest {
    private String description;
    private Date endDate;
    private String name;
    private Long teamId;
    private Status status;

    public CreateProjectRequest() {
    }

    public CreateProjectRequest(String description, Date endDate, String name, Long teamId, Status status) {
        this.description = description;
        this.endDate = endDate;
        this.name = name;
        this.teamId = teamId;
        this.status = status;
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

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }
}
