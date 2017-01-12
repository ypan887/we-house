require('normalize.css/normalize.css');
require('styles/App.css');

import React, { Component } from 'react';
import Apartment from './apartment';

let apartmentDatas = require('../data/apartment.json');

apartmentDatas = ((apartmentsArr) => {
  for (let i = 0; i < apartmentsArr.length; i++) {
    let singleImageData = apartmentsArr[i];
    singleImageData.imageURL = require('../images/' + singleImageData.image);
    apartmentsArr[i] = singleImageData;
  }

  return apartmentsArr;
} )(apartmentDatas.apartments);


class AppComponent extends Component {
  render() {
    let apartments = [];
    apartmentDatas.forEach((value, index) => {
      apartments.push(<Apartment data={ value } key={ index } />)
      });

    return (
      <div className="index">
        <div className="content">
          <section className="apartment-list">
            { apartments }
          </section>
        </div>
      </div>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
