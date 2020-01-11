package ba.unsa.pmf.pragma.db.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name = "ticket_types")
public class TicketType extends LookupEntity {

    @Column(name = "description", nullable = false)
    private String description;

    @Column(name = "min_score", nullable = false)
    private Short minScore;

    @Column(name = "max_score", nullable = false)
    private Short maxScore;

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Short getMinScore() {
        return minScore;
    }

    public void setMinScore(Short minScore) {
        this.minScore = minScore;
    }

    public Short getMaxScore() {
        return maxScore;
    }

    public void setMaxScore(Short maxScore) {
        this.maxScore = maxScore;
    }
}
