package ba.unsa.pmf.pragma.db.entity;

import javax.persistence.*;

/**
 * @author malek.chahin
 * November, 05, 2019.
 */
@Entity
@Table(name = "lkp_statuses")
public class Status extends LookupEntity {

    @ManyToOne
    @JoinColumn(name = "status_type", nullable = false)
    private StatusType statusType;

    @Column(name = "key", nullable = false, insertable = false, updatable = false, unique = true)
    private String key;

    public StatusType getStatusType() {
        return statusType;
    }

    public void setStatusType(StatusType statusType) {
        this.statusType = statusType;
    }

    public String getKey() {
        return key;
    }
}
