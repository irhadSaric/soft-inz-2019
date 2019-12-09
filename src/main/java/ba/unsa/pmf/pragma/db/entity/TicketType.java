package ba.unsa.pmf.pragma.db.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name = "ticket_types")
public class TicketType extends LookupEntity{
    @Column(name = "description", nullable = false)
    private String description;

    @Column(name = "score", nullable = false)
    private Long score;

    @Column(name = "duration", nullable = false)
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
