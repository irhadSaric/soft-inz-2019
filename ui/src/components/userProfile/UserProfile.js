/* eslint-disable no-nested-ternary */
import React, { Component } from 'react';
import { Grid, Card, Image, Icon } from 'semantic-ui-react';

class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  onSubmit = (values) => {
  }

  render() {
    return (
        <Grid stackable>
            <Card>
                <Image src='/images/avatar/large/matthew.png' wrapped ui={false} />
                <Card.Content>
                <Card.Header>Matthew</Card.Header>
                <Card.Meta>
                    <span className='date'>Joined in 2015</span>
                </Card.Meta>
                <Card.Description>
                    Matthew is a musician living in Nashville.
                </Card.Description>
                </Card.Content>
                <Card.Content extra>
                <a>
                    <Icon name='user' />
                    22 Friends
                </a>
                </Card.Content>
            </Card>
        </Grid>

    );
  }
}

export default (UserProfile);
