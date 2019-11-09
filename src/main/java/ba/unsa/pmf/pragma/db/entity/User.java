package ba.unsa.pmf.pragma.db.entity;

import org.hibernate.validator.constraints.Length;

import javax.persistence.*;

/**
 * @author malek.chahin
 * November, 05, 2019.
 */
@Entity
@Table(name = "users")
public class User extends BaseEntity {

    @Column(name = "first_name", nullable = false)
    private String firstName;

    @Column(name = "last_name", nullable = false)
    private String lastName;

    @Column(name = "email", nullable = false, unique = true)
    private String email;

    @Column(name = "password", nullable = false)
    @Length(min = 5, message = "*Your password must have at least 5 characters")
    @Transient
    private String password;

    @Column(name = "phone", nullable = false)
    @Length(min = 10, message = "*Your phone number must be at least 10 characters long")
    private String phone;

    @ManyToOne
    @JoinColumn(name = "country", nullable = false)
    private Country country;

    public String getPassword() {
        return password;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public Country getCountry() {
        return country;
    }

    public void setCountry(Country country) {
        this.country = country;
    }
}