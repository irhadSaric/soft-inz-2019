package ba.unsa.pmf.pragma.service.dtos;

import javax.validation.constraints.NotNull;

/**
 * @author malek.chahin
 * November, 11, 2019.
 */
public class LoginRequest {

    @NotNull
    private String email;

    @NotNull
    private String password;

    public LoginRequest() {
    }

    public LoginRequest(String email, String password) {
        this.email = email;
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
