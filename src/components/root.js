import React, { Component } from 'react';
import { Router, Route, IndexRoute } from 'react-router';
import App from './Main';
import Apartment from './apartment'
import ApartmentList from './apartmentList'

class Root extends Component {
  render() {
    return (
      <Router history={this.props.history}>
        <Route path='/' component={ App }>
          <IndexRoute component={ ApartmentList } />
          <Route path="/:id" component={ Apartment } />
        </Route>
      </Router>
    );
  }
}

export default Root;
