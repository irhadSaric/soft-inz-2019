package ba.unsa.pmf.pragma.service.dtos;

import ba.unsa.pmf.pragma.db.entity.Status;
import ba.unsa.pmf.pragma.db.entity.TicketType;

import java.util.Date;

public class TicketResponse {

    private String name;
    private String description;
    private Date startDate;
    private Date endDate;
    private Long assigneeId;
    private Status status;
    private Long iterationId;
    private Short ticketTypeId;


    public TicketResponse(String name, String description, Date startDate, Date endDate, Long assigneeId, Status status, Long iterationId, Short ticketTypeId) {
        this.name = name;
        this.description = description;
        this.startDate = startDate;
        this.endDate = endDate;
        this.assigneeId = assigneeId;
        this.status = status;
        this.iterationId = iterationId;
        this.ticketTypeId = ticketTypeId;
    }
    public TicketResponse(String name, String description, Date startDate, Date endDate,Status status) {
        this.name = name;
        this.description = description;
        this.startDate = startDate;
        this.endDate = endDate;
        this.status = status;
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

    public Status getStatus() { return status; }

    public void setStatus(Status status) {
        this.status = status;
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
