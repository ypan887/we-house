require('normalize.css/normalize.css');
require('bootstrap/dist/css/bootstrap.css');
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
  constructor() {
    super();
    this.state = {
      order: "popularity"
    }
    this.pop = this.pop.bind(this);
    this.price = this.price.bind(this);
    this.sortApt = this.sortApt.bind(this);
  }

  sortApt(sortValue){
    apartmentDatas = apartmentDatas.sort((a, b) => {
      return b[sortValue] - a[sortValue];
    });
  }

  pop(){
    this.setState({order: "popularity"});
  }

  price(){
    this.setState({order: "price"});
  }

  render() {
    let apartments = [],
        popButtonName = "btn",
        priceButtonName = "btn";
    if (this.state.order==="price") {
      this.sortApt(this.state.order);
      priceButtonName += " active";
    } else {
      this.sortApt(this.state.order);
      popButtonName += " active";
    }

    apartmentDatas.forEach((value, index) => {
      apartments.push(<Apartment data={ value } key={ index } />)
      });

    return (
      <div className="index">
        <div className="container">
          <div className="content">
            <div className="row">
              <div className="col-sm-10 col-sm-offset-1">
                <div>
                  <h2 className="title">MN: { apartmentDatas.length } Apartments</h2>
                </div>
                <div className="sort-buttons">
                  <button className={ popButtonName } onClick={ this.pop }>popularity</button>
                  <button className={ priceButtonName } onClick={ this.price }>Price</button>
                </div>
                <section className="apartment-list">
                  { apartments }
                </section>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
