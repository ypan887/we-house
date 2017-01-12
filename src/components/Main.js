require('normalize.css/normalize.css');
require('bootstrap/dist/css/bootstrap.css');
require('styles/App.css');

import React, { Component } from 'react';
import ReactPaginate from 'react-paginate';
import Apartment from './apartment';


let apartmentDatas = require('../data/apartment.json');
const pageLimit = 5;

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
      order: "popularity",
      data: [],
      offset: 0,
      pageCount: Math.ceil(apartmentDatas.length / pageLimit)
    }
    this.pop = this.pop.bind(this);
    this.price = this.price.bind(this);
    this.sortApt = this.sortApt.bind(this);
    this.handlePageClick = this.handlePageClick.bind(this);
  }

  sortApt(sortValue){
    apartmentDatas = apartmentDatas.sort((a, b) => {
      return b[sortValue] - a[sortValue];
    });
  }

  currentApts(offset) {
    return apartmentDatas.filter((item, i) => {
      return i >= offset && i < offset + pageLimit;
    });
  }

  pop(){
    this.sortApt("popularity");
    let currentApts = this.currentApts(this.state.offset);
    this.setState({order: "popularity", data: currentApts});
  }

  price(){
    this.sortApt("price");
    let currentApts = this.currentApts(this.state.offset);
    this.setState({order: "price", data: currentApts});
  }

  handlePageClick(data){
    let selected = data.selected;
    let offset = Math.ceil(selected * pageLimit);
    let currentApts = this.currentApts(offset);
    this.setState({
      offset: offset,
      data: currentApts
    });
  };

  render() {
    let apartments = [],
        popButtonName = "btn",
        priceButtonName = "btn";
    if (this.state.order==="price") {
      priceButtonName += " active";
    } else {
      popButtonName += " active";
    }

    this.state.data.forEach((value, index) => {
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
                <div>
                  <ReactPaginate previousLabel={"previous"}
                       nextLabel={"next"}
                       breakLabel={<a href="">...</a>}
                       breakClassName={"break-me"}
                       pageCount={this.state.pageCount}
                       marginPagesDisplayed={2}
                       pageRangeDisplayed={5}
                       onPageChange={this.handlePageClick}
                       containerClassName={"pagination"}
                       subContainerClassName={"pages pagination"}
                       activeClassName={"active"} />
                </div>
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
