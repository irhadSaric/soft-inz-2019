import React, { Component } from "react";
import { Container, Header, Input, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { loginAction } from "../../redux/actions";

class Login extends Component {
  constructor(props) {
    super(props);

    // reset login status
    //this.props.logout();

    this.state = {
      email: "",
      password: "",
      submitted: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleSubmit(e) {
    e.preventDefault();
    const { actions } = this.props;

    this.setState({ submitted: true });
    const { email, password } = this.state;
    if (email && password) {
      actions.login(email, password);
    }
  }

  render() {
    const { loggingIn } = this.props;
    const { email, password, submitted } = this.state;
    return (
      <div className="loginDiv">
        <Container className="loginWrapper">
          <Header as="h2">Log in to Pragma</Header>
          <form name="form" onSubmit={this.handleSubmit}>
            <div
              className={
                "formGroup" + (submitted && !email ? " has-error" : "")
              }
            >
              <Input
                type="email"
                icon={"at"}
                iconPosition={"left"}
                className="formInput"
                name="email"
                value={email}
                onChange={this.handleChange}
                placeholder={"Email"}
              />
            </div>
            <div
              className={
                "formGroup" + (submitted && !password ? " has-error" : "")
              }
            >
              <Input
                type="password"
                icon={"lock"}
                iconPosition={"left"}
                className="formInput"
                name="password"
                value={password}
                onChange={this.handleChange}
                placeholder={"Password"}
              />
            </div>
            <div className="loginBtnGroup">
              <Button
                disabled={!email || !password}
                color={"green"}
                className="btn btn-primary loginBtn"
              >
                Login
              </Button>
              {loggingIn}
              <Link to="/register" className="btn btn-link link">
                Register
              </Link>
            </div>
          </form>
        </Container>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { user: state.user };
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(Object.assign({}, loginAction), dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
