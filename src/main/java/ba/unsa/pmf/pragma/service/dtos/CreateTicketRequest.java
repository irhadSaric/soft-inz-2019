package ba.unsa.pmf.pragma.service.dtos;

import java.util.Date;

public class CreateTicketRequest {
    private  String name;
    private  String description;
    private  Date endDate;
    private  Long assigneeId;
    private  Short statusId;
    private  Long iterationId;
    private  Short ticketTypeId;

    public CreateTicketRequest(String name, String description, Date endDate, Long assigneeId, Short statusId, Long iterationId, Short ticketTypeId) {
        this.name = name;
        this.description = description;
        this.endDate = endDate;
        this.assigneeId = assigneeId;
        this.statusId = statusId;
        this.iterationId = iterationId;
        this.ticketTypeId = ticketTypeId;
    }

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

    public Long getAssigneeId() {
        return assigneeId;
    }

    public void setAssigneeId(Long assigneeId) {
        this.assigneeId = assigneeId;
    }

    public Short getStatusId() {
        return statusId;
    }

    public void setStatusId(Short statusId) {
        this.statusId = statusId;
    }

    public Long getIterationId() {
        return iterationId;
    }

    public void setIterationId(Long iterationId) {
        this.iterationId = iterationId;
    }

    public Short getTicketTypeId() {
        return ticketTypeId;
    }

    public void setTicketTypeId(Short ticketTypeId) {
        this.ticketTypeId = ticketTypeId;
    }
}
