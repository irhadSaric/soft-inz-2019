package ba.unsa.pmf.pragma.db.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

/**
 * @author malek.chahin
 * November, 10, 2019.
 */
@Entity
@Table(name = "roles")
public class Role extends LookupEntity {

    @Column(name = "key", insertable = false, unique = true, updatable = false)
    private String key;

    public String getKey() {
        return key;
    }

    public void setKey(String key) {
        this.key = key;
    }
}
