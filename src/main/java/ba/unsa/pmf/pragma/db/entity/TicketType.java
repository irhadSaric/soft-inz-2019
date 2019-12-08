package ba.unsa.pmf.pragma.db.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name = "ticket_types")
public class TicketType extends LookupEntity{
    @Column(name = "description", insertable = false, unique = true, updatable = false, nullable = false)
    private String description;

    @Column(name = "score", insertable = false, updatable = false, nullable = false)
    private Long score;

    @Column(name = "duration", insertable = false, updatable = false, nullable = false)
    private Long duration;

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Long getScore() {
        return score;
    }

    public void setScore(Long score) {
        this.score = score;
    }

    public Long getDuration() {
        return duration;
    }

    public void setDuration(Long duration) {
        this.duration = duration;
    }
}
