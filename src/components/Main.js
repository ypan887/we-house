require('normalize.css/normalize.css');
require('bootstrap/dist/css/bootstrap.css');
require('styles/App.css');

import React, { Component } from 'react';

class AppComponent extends Component {
  render() {

    return (
      <div className="index">
        <div className="container">
          {this.props.children}
        </div>
      </div>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
