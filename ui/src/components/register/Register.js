import React, { Component } from 'react';
import { Container, Header, Button, Input } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { loginAction } from '../../redux/actions';


class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
        user: {
            firstName: '',
            lastName: '',
            username: '',
            password: ''
        },
        submitted: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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

handleSubmit(event) {
    event.preventDefault();
    const {actions} = this.props;

    this.setState({ submitted: true });
    const { user } = this.state;
    if (user.firstName && user.lastName && user.username && user.password) {
        actions.register(user);
    }
}

render() {
    const { registering  } = this.props;
    const { user, submitted } = this.state;
    return (
        <div className="loginDiv">
          <Container className="loginContainer">
            <Header as="h2">Register</Header>
            <form name="form" onSubmit={this.handleSubmit}>
                <div className={'formGroup' + (submitted && !user.firstName ? ' has-error' : '')}>
                    <label htmlFor="firstName">First Name</label>
                    <Input type="text" className="formInput" name="firstName" value={user.firstName} onChange={this.handleChange} />
                    {submitted && !user.firstName &&
                        <div className="help-block">First Name is required</div>
                    }
                </div>
                <div className={'formGroup' + (submitted && !user.lastName ? ' has-error' : '')}>
                    <label htmlFor="lastName">Last Name</label>
                    <Input type="text" className="formInput" name="lastName" value={user.lastName} onChange={this.handleChange} />
                    {submitted && !user.lastName &&
                        <div className="help-block">Last Name is required</div>
                    }
                </div>
                <div className={'formGroup' + (submitted && !user.username ? ' has-error' : '')}>
                    <label htmlFor="username">Username</label>
                    <Input type="text" className="formInput" name="username" value={user.username} onChange={this.handleChange} />
                    {submitted && !user.username &&
                        <div className="help-block">Username is required</div>
                    }
                </div>
                <div className={'formGroup' + (submitted && !user.password ? ' has-error' : '')}>
                    <label htmlFor="password">Password</label>
                    <Input type="password" className="formInput" name="password" value={user.password} onChange={this.handleChange} />
                    {submitted && !user.password &&
                        <div className="help-block">Password is required</div>
                    }
                </div>
                <div className="formGroup">
                    <Button className="btn btn-primary">Register</Button>
                    {registering}
                    <Link to="/login" className="btn btn-link">Cancel</Link>
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

  export default connect(mapStateToProps, mapDispatchToProps)(Register);
  