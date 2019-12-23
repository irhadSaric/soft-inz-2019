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
    @Column(columnDefinition = "serial")
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
}
