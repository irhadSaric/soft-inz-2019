package ba.unsa.pmf.pragma.service.dtos;

import ba.unsa.pmf.pragma.db.entity.Status;

import java.util.Date;

public class CreateProjectResponse {
    private String name;
    private Status statusId;
    private Date startDate;
    private Date endDate;
    private String description;
    private Long teamId;

    public CreateProjectResponse() {
    }

    public CreateProjectResponse(String name, Status statusId, Date startDate, Date endDate, String description, Long teamId) {
        this.name = name;
        this.statusId = statusId;
        this.startDate = startDate;
        this.endDate = endDate;
        this.description = description;
        this.teamId = teamId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Status getStatusId() {
        return statusId;
    }

    public void setStatusId(Status statusId) {
        this.statusId = statusId;
    }

    public Date getStartDate() {
        return startDate;
    }

    public void setStartDate(Date startDate) {
        this.startDate = startDate;
    }

    public Date getEndDate() {
        return endDate;
    }

    public void setEndDate(Date endDate) {
        this.endDate = endDate;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Long getTeamId() {
        return teamId;
    }

    public void setTeamId(Long teamId) {
        this.teamId = teamId;
    }
}
