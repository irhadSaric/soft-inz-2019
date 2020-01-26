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
        LookupEntity other = (LookupEntity) obj;
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