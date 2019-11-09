package ba.unsa.pmf.pragma.db.entity;

import javax.persistence.Entity;
import javax.persistence.Table;

/**
 * @author malek.chahin
 * November, 05, 2019.
 */
@Entity
@Table(name = "lkp_countries")
public class Country extends LookupEntity {
}
