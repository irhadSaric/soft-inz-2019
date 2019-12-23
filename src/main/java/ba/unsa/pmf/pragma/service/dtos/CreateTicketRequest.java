package ba.unsa.pmf.pragma.service.dtos;

import java.util.Date;

public class CreateTicketRequest {
    private  String name;
    private  String description;
    private  Date endDate;
    private  Long projectId;



    public CreateTicketRequest(String name, String description, Date endDate, Long projectId) {
        this.name = name;
        this.description = description;
        this.endDate = endDate;
        this.projectId = projectId;
    }
    public Long getProjectId() { return projectId; }

    public void setProjectId(Long projectId) { this.projectId = projectId; }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
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

}
