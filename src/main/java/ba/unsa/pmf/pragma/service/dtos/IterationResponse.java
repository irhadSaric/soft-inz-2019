package ba.unsa.pmf.pragma.service.dtos;

import ba.unsa.pmf.pragma.db.entity.Status;

import java.util.Date;

public class IterationResponse {
    private String description;
    private Date startDate;
    private Date endDate;
    private String name;
    private Long projectId;
    private Status status;

    public IterationResponse() {
    }

    public IterationResponse(String description, Date startDate, Date endDate, String name, Long projectId, Status status) {
        this.description = description;
        this.startDate = startDate;
        this.endDate = endDate;
        this.name = name;
        this.projectId = projectId;
        this.status = status;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
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

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Long getProjectId() {
        return projectId;
    }

    public void setProjectId(Long projectId) {
        this.projectId = projectId;
    }

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }
}
