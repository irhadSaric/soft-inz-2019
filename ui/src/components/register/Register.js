import React, { Component } from "react";
import { Container, Header, Button, Input, Dropdown } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { loginAction, countryAction } from "../../redux/actions";

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {
        email: "",
        firstName: "",
        lastName: "",
        password: "",
        phone: "",
      },
      selectedValue: "",
      confirmPassword: "",
      submitted: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount(){
    const {actions} = this.props;
    actions.getAllCountries();
    /*.then(
      res => this.setState({
        countries: res.countries,
      }),
    );*/

  }

  handleChange(event) {
    const { name, value } = event.target;
    const { user } = this.state;
    this.setState({
      user: {
        ...user,
        [name]: value
      }
    });
  }

  onChange(e, {selectedValue}) {
    this.setState({
      country: {value: selectedValue}
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { actions } = this.props;

    this.setState({ submitted: true });
    const { user } = this.state;
    if (user.firstName && user.lastName && user.email && user.password) {
      actions.register(user);
    }
  }

  render() {
    const { registering, countries } = this.props;
    console.log(countries);
    const { user, submitted, selectedValue } = this.state;

    const countryOptions = [
      { key: "af", value: "af", text: "Afghanistan" },
      { key: "ax", value: "ax", text: "Aland Islands" },
      { key: "al", value: "al", text: "Albania" },
      { key: "dz", value: "dz", text: "Algeria" },
      { key: "as", value: "as", text: "American Samoa" },
      { key: "ad", value: "ad", text: "Andorra" },
      { key: "ao", value: "ao", text: "Angola" },
      { key: "ai", value: "ai", text: "Anguilla" },
      { key: "ag", value: "ag", text: "Antigua" },
      { key: "ar", value: "ar", text: "Argentina" },
      { key: "am", value: "am", text: "Armenia" },
      { key: "aw", value: "aw", text: "Aruba" },
      { key: "au", value: "au", text: "Australia" },
      { key: "at", value: "at", text: "Austria" },
      { key: "az", value: "az", text: "Azerbaijan" },
      { key: "bs", value: "bs", text: "Bahamas" },
      { key: "bh", value: "bh", text: "Bahrain" },
      { key: "bd", value: "bd", text: "Bangladesh" },
      { key: "bb", value: "bb", text: "Barbados" },
      { key: "by", value: "by", text: "Belarus" },
      { key: "be", value: "be", text: "Belgium" },
      { key: "bz", value: "bz", text: "Belize" },
      { key: "bj", value: "bj", text: "Benin" },
      { key: "ba", value: "ba", text: "Bosnia and Herzegovina" }
    ];

    return (
      <div className="registerDiv">
        <Container className="registerWrapper">
          <Header as="h2">Register</Header>
          <form name="form" onSubmit={this.handleSubmit}>
            <div
              className={
                "formGroup" + (submitted && !user.email ? " has-error" : "")
              }
            >
              <label htmlFor="email" className={"label"}>
                Email
              </label>
              <Input
                type="email"
                className="formInput"
                name="email"
                value={user.email}
                onChange={this.handleChange}
                error={submitted && !user.email}
                placeholder={"Email"}
                icon={"at"}
                iconPosition={"left"}
              />
              {submitted && !user.email && (
                <div className="help-block">Email is required</div>
              )}
            </div>
            <div
              className={
                "formGroup" + (submitted && !user.firstName ? " has-error" : "")
              }
            >
              <label htmlFor="firstName" className={"label"}>
                First Name
              </label>
              <Input
                type="text"
                className="formInput"
                name="firstName"
                value={user.firstName}
                onChange={this.handleChange}
                error={submitted && !user.firstName}
                placeholder={"First Name"}
              />
              {submitted && !user.firstName && (
                <div className="help-block">First Name is required</div>
              )}
            </div>
            <div
              className={
                "formGroup" + (submitted && !user.lastName ? " has-error" : "")
              }
            >
              <label htmlFor="lastName" className={"label"}>
                Last Name
              </label>
              <Input
                type="text"
                className="formInput"
                name="lastName"
                value={user.lastName}
                onChange={this.handleChange}
                error={submitted && !user.lastName}
                placeholder={"Last Name"}
              />
              {submitted && !user.lastName && (
                <div className="help-block">Last Name is required</div>
              )}
            </div>

            <div
              className={
                "formGroup" + (submitted && !user.password ? " has-error" : "")
              }
            >
              <label htmlFor="password" className={"label"}>
                Password
              </label>
              <Input
                type="password"
                className="formInput"
                name="password"
                value={user.password}
                onChange={this.handleChange}
                error={submitted && !user.password}
                placeholder={"Password"}
              />
              {submitted && !user.password && (
                <div className="help-block">Password is required</div>
              )}
            </div>
            <div
              className={
                "formGroup" +
                (submitted && !user.confirmPassword ? " has-error" : "")
              }
            >
              <label htmlFor="confirmPassword" className={"label"}>
                Confirm password
              </label>
              <Input
                type="password"
                className="formInput"
                name="confirmPassword"
                value={user.confirmPassword}
                onChange={this.handleChange}
                error={
                  submitted &&
                  (!user.confirmPassword ||
                    (user.password && user.password !== user.confirmPassword))
                }
                placeholder={"Confirm password"}
              />
              {submitted &&
                ((!user.confirmPassword && (
                  <div className="help-block">Confirm password is required</div>
                )) ||
                  (user.password && user.password !== user.confirmPassword && (
                    <div className="help-block">
                      Password and confirmation password do not match.
                    </div>
                  )))}
            </div>
            <div
              className={
                "formGroup" + (submitted && !user.phone ? " has-error" : "")
              }
            >
              <label htmlFor="phone" className={"label"}>
                Phone
              </label>
              <Input
                type="text"
                className="formInput"
                name="phone"
                value={user.phone}
                onChange={this.handleChange}
                error={submitted && !user.phone}
                placeholder={"Phone"}
              />
              {submitted && !user.phone && (
                <div className="help-block">Phone is required</div>
              )}
            </div>
            <div className={"formGroup"}>
              <label htmlFor="country" className={"label"}>
                Country
              </label>
              <Dropdown
                clearable
                fluid
                search
                selection
                options={countryOptions}
                placeholder="Select Country"
              />
            </div>
            <div className="formGroup registerFormGroup">
              <Link
                to="/login"
                className="btn btn-link"
                style={{ marginRight: 10 }}
              >
                Cancel
              </Link>
              <Button
                disabled={
                  submitted &&
                  (!user.email ||
                    !user.firstName ||
                    !user.lastName ||
                    !user.password ||
                    !user.phone)
                }
                color={"green"}
                className="btn btn-primary"
              >
                Register
              </Button>
              {registering}
            </div>
          </form>
        </Container>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { user: state.user, countries: state.countries };
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(Object.assign({}, loginAction, countryAction), dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Register);
