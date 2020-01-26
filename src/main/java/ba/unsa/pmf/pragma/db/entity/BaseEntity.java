package ba.unsa.pmf.pragma.db.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import java.util.Date;

/**
 * @author malek.chahin
 * November, 05, 2019.
 */
@MappedSuperclass
public abstract class BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @JsonIgnore
    @Column(name = "last_updated")
    @UpdateTimestamp
    private Date lastUpdated;

    public Long getId() {
        return id;
    }

    public Date getLastUpdated() {
        return lastUpdated;
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((id == null) ? 0 : id.hashCode());
        return result;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) {
            return true;
        }
        if (obj == null) {
            return false;
        }
        if (getClass() != obj.getClass()) {
            return false;
        }
        BaseEntity other = (BaseEntity) obj;
        if (id == null) {
            if (other.id != null) {
                return false;
            } else {
                return this == other;
            }
        } else if (!id.equals(other.id)) {
            return false;
        }
        return true;
    }
}
