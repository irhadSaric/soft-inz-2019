import React, { Component } from 'react';
import { Container, Header, Input, Grid, Button } from 'semantic-ui-react';
import { Form, Field } from 'react-final-form';
import './Login.css';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { loginAction } from '../../redux/actions';


class Login extends Component {
  constructor(props) {
    super(props);

    // reset login status
    //this.props.logout();

    this.state = {
        username: '',
        password: '',
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
    const {actions} = this.props;

    this.setState({ submitted: true });
    const { username, password } = this.state;
    if (username && password) {
        actions.login(username, password);
    }
}

render() {
    const { loggingIn } = this.props;
    const { username, password, submitted } = this.state;
    return (
        <div className="loginDiv">
            <Container className="loginContainer">
            <Header as="h2">Log in to Pragma</Header>
            <form name="form" onSubmit={this.handleSubmit}>
                <div className={'formGroup' + (submitted && !username ? ' has-error' : '')}>
                    <label htmlFor="username">Username</label>
                    <Input type="text" className="formInput" name="username" value={username} onChange={this.handleChange} />
                    {submitted && !username &&
                        <div className="help-block">Username is required</div>
                    }
                </div>
                <div className={'formGroup' + (submitted && !password ? ' has-error' : '')}>
                    <label htmlFor="password">Password</label>
                    <Input type="password" className="formInput" name="password" value={password} onChange={this.handleChange} />
                    {submitted && !password &&
                        <div className="help-block">Password is required</div>
                    }
                </div>
                <div className="formGroup">
                    <Button className="btn btn-primary">Login</Button>
                    {loggingIn}
                    <Link to="/register" className="btn btn-link">Register</Link>
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
    actions: bindActionCreators(Object.assign({}, loginAction), dispatch),
  });

  export default connect(mapStateToProps, mapDispatchToProps)(Login);
  