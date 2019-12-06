package ba.unsa.pmf.pragma.service.dtos;

import java.util.Date;

public class TeamWithoutLogo {
    private Long id;
    private String name;
    private String description;
    private Date creationDate;
    private Date lastUpdated;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public Date getCreationDate() {
        return creationDate;
    }

    public void setCreationDate(Date creationDate) {
        this.creationDate = creationDate;
    }

    public Date getLastUpdated() {
        return lastUpdated;
    }

    public void setLastUpdated(Date lastUpdated) {
        this.lastUpdated = lastUpdated;
    }

    public TeamWithoutLogo(Long id, String name, String description, Date creationDate, Date lastUpdated) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.creationDate = creationDate;
        this.lastUpdated = lastUpdated;
    }
}
