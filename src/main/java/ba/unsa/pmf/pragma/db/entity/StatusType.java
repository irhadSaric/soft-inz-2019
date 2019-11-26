package ba.unsa.pmf.pragma.db.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

/**
 * @author malek.chahin
 * November, 24, 2019.
 */
@Entity
@Table(name = "lkp_status_types")
public class StatusType extends LookupEntity {

    @Column(name = "key", insertable = false, unique = true, updatable = false, nullable = false)
    private String key;

    public String getKey() {
        return key;
    }
}
