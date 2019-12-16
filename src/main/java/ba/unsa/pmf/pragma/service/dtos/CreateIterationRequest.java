package ba.unsa.pmf.pragma.service.dtos;

import java.util.Date;

public class CreateIterationRequest {
    private String description;
    private Date endDate;
    private String name;
    private Long projectId;

    public CreateIterationRequest() {
    }

    public CreateIterationRequest(String description, Date startDate, Date endDate, String name, Long projectId) {
        this.description = description;
        this.endDate = endDate;
        this.name = name;
        this.projectId = projectId;
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

    public Long getProjectId() {
        return projectId;
    }

    public void setProjectId(Long projectId) {
        this.projectId = projectId;
    }
}
