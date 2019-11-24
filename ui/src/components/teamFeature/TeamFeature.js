import React, { Component } from 'react';
import { Button, Popup, Grid, Dropdown } from 'semantic-ui-react';
import teamData from './teamData';
import './TeamFeature.css';


class TeamFeature extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

onSubmit = (values) => {
}

  render(){    
    const teamOptions = teamData.map(item => ({
        key: item.email,
        text: item.email,
        value: item.email,
    }))

      return(
        <Popup id="popup" wide trigger={<Button content='Click to create a new team' />} on='click'>
        <Grid divided columns='equal'>
        <Grid.Row>
            <Popup
              trigger={<input id="teamName"
              placeholder='Team name' 
              fluid 
              />}
              content='Team name'
              position='top center'
              inverted
            />
          </Grid.Row>

          <Grid.Column>
            <Popup
              trigger={<textarea 
              id="description"
              color='blue' 
              placeholder='Description of a project' 
              fluid 
              />}
              content='Project description'
              position='top center'
              size='tiny'
              inverted
            />
          </Grid.Column>
          <Grid.Row>
            <Popup
              trigger={<Dropdown id="dropdown"
                placeholder='Invite team member'
                fluid
                multiple
                search
                selection
                options={teamOptions}
              />}
            />
          </Grid.Row>
          <Grid.Row>
            <Popup
              trigger={<Button 
                type="Submit" 
                color='blue' 
                content='Submit' 
                fluid 
                />}
                position='top center'
            />
          </Grid.Row>
        </Grid>
      </Popup>
    );
  }
}

export default (TeamFeature);