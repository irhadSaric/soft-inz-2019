package ba.unsa.pmf.pragma.db.entity;

import javax.persistence.*;

/**
 * @author malek.chahin
 * November, 05, 2019.
 */
@MappedSuperclass
public abstract class LookupEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(columnDefinition = "serial")
    private Short id;

    @Column(name = "name", nullable = false)
    private String name;

    public Short getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
