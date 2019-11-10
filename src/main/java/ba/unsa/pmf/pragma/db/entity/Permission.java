package ba.unsa.pmf.pragma.db.entity;

import javax.persistence.Entity;
import javax.persistence.Table;

/**
 * @author malek.chahin
 * November, 10, 2019.
 */
@Entity
@Table(name = "permissions")
public class Permission extends LookupEntity {
}
