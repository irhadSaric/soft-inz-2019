import React, { Component } from 'react';
import { Container } from 'semantic-ui-react';
import './Dashboard.css';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';


class Dashboard extends Component {
  static contextTypes = {
    router: PropTypes.object,
  }

    render() {
      return (
        <div className="">
          <Container className="dashboardContainer">
            
          </Container>
        </div>
      );
    }
  }

  function mapStateToProps(state) {
    return {};
  }
  
  const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(Object.assign({}), dispatch),
  });

  export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
  