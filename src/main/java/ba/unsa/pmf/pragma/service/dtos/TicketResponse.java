package ba.unsa.pmf.pragma.service.dtos;

import ba.unsa.pmf.pragma.db.entity.TicketType;

import java.util.Date;

public class TicketResponse {

    private String name;
    private String description;
    private Date startDate;
    private Date endDate;
    private Long assigneeId;
    private Short statusId;
    private Long iterationId;
    private Short ticketTypeId;

    public TicketResponse(String name, String description, Date startDate, Date endDate, Long assigneeId, Short statusId, Long iterationId, Short ticketTypeId) {
        this.name = name;
        this.description = description;
        this.startDate = startDate;
        this.endDate = endDate;
        this.assigneeId = assigneeId;
        this.statusId = statusId;
        this.iterationId = iterationId;
        this.ticketTypeId = ticketTypeId;
    }
    public TicketResponse(String name, String description, Date startDate, Date endDate, Long iterationId, Short ticketTypeId) {
        this.name = name;
        this.description = description;
        this.startDate = startDate;
        this.endDate = endDate;
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
