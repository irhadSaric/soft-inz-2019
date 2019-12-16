package ba.unsa.pmf.pragma.service.dtos;

import java.util.Date;

public class CreateTicketRequest {
    private  String name;
    private  String description;
    private  Date endDate;

    public CreateTicketRequest(String name, String description, Date endDate) {
        this.name = name;
        this.description = description;
        this.endDate = endDate;
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

}
