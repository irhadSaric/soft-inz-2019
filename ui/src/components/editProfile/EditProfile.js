import React, { Component } from 'react';
import { Container, Header, Button, Input } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import './EditProfile.css';

class EditProfile extends Component {

    constructor(props){
      super(props);

        this.state = {
        user: {
                firstName: 'firstName', 
                lastName: 'last name',
                phoneNumber: 'phone number',
                country: 'country'
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
        if (user.firstName && user.lastName && user.phoneNumber && user.country) {
            actions.UserProfileEdit(user);
        }
    }

    render() {     
        const { user, submitted } = this.state;
        return (
            <div id="editDiv">
            <Container>
                <Header as="h2">Edit profile data</Header>
                <form name="form" onSubmit={this.handleSubmit}>
                    <div>
                        <label htmlFor="firstName">First Name</label>
                        <Input type="text" className="formInput" name="firstName" value={user.firstName} onChange={this.handleChange} />
                        {submitted && !user.firstName}
                    </div>
                    <div >
                        <label htmlFor="lastName">Last Name</label>
                        <Input type="text" className="formInput" name="lastName" value={user.lastName} onChange={this.handleChange} />
                        {submitted && !user.lastName}
                    </div>
                    <div>
                        <label htmlFor="phoneNumber">Phone Number</label>
                        <Input type="tel" className="formInput" name="phoneNumber" value={user.phoneNumber} onChange={this.handleChange} />
                        {submitted && !user.phoneNumber}
                    </div>
                    <div>
                        <label htmlFor="country">Country</label>
                        <Input type="text" className="formInput" name="country" value={user.country} onChange={this.handleChange} />
                        {submitted && !user.country}
                    </div>
                    <div className="formGroup">
                        <Button className="btn btn-primary">Save changes</Button>
                        <Link to="/user" className="btn btn-link">Cancel</Link>
                    </div>
                </form>
                </Container>
            </div>

            );
        }
    }


export default EditProfile; 