import React, { Component } from 'react';
import ReactPaginate from 'react-paginate';
import ApartmentItem from './apartmentItem';


let apartmentDatas = require('../data/apartment.json');
const pageLimit = 5;

apartmentDatas = ((apartmentsArr) => {
  for (let i = 0; i < apartmentsArr.length; i++) {
    let singleAptData = apartmentsArr[i];
    singleAptData.imageURL = require('../images/' + singleAptData.image);
    singleAptData.isFocus = false;
    apartmentsArr[i] = singleAptData;
  }

  return apartmentsArr;
} )(apartmentDatas.apartments);


class ApartmentListComponent extends Component {
  constructor() {
    super();
    this.state = {
      order: "popularity",
      data: this.currentApts(0),
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

  focus(index) {
    return () => {
      let apts = this.state.data;
      apts[index].isFocus = !apts[index].isFocus;
      this.setState({
        data: apts
      })
    }
  }

  render() {
    let apartments = [],
        popButtonName = "btn",
        priceButtonName = "btn",
        apartmentCounts = apartmentDatas.length + " apartment";
    if (this.state.order==="price") {
      priceButtonName += " active";
    } else {
      popButtonName += " active";
    }

    if (apartmentDatas.length >1) {
      apartmentCounts += "s"
    }

    this.state.data.forEach((value, index) => {
      apartments.push(
        <ApartmentItem
          data={ value }
          key={ index }
          focus= { this.focus(index) }
        />)
      });

    return (
      <div className="content">
        {this.props.children}
        <div className="row">
          <div className="col-sm-10 col-sm-offset-1">
            <div>
              <h2 className="title">{ apartmentDatas[0].description.split("|")[1] }: { apartmentCounts }</h2>
            </div>
            <div className="sort-buttons">
              <button className={ popButtonName } onClick={ this.pop }>popularity</button>
              <button className={ priceButtonName } onClick={ this.price }>Price</button>
            </div>
            <section className="apartment-list">
              { apartments }
            </section>
            <div>
              <ReactPaginate
                previousLabel={"previous"}
                nextLabel={"next"}
                breakLabel={<a href="">...</a>}
                breakClassName={"break-me"}
                pageCount={this.state.pageCount}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={this.handlePageClick}
                containerClassName={"pagination"}
                subContainerClassName={"pages pagination"}
                activeClassName={"active"}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ApartmentListComponent;
