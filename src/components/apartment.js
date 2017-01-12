import React, { Component } from 'react';

class apartmentComponent extends Component {
  render() {
    return(
      <div>
        <div className="row">
          <div className="col-sm-5">
            <figure>
              <img
                src={ this.props.data.imageURL }
                alt={ this.props.data.title }
              />
            </figure>
          </div>
          <div className="col-sm-7">
            <div className="list-title">
              <h2>{ this.props.data.title }</h2>
            </div>
            <div className="list-desc">
              <p>{ this.props.data.description }</p>
            </div>
            <div>
              <span className="price-prefix">From</span>
              <span className="price-value">${ this.props.data.price }</span>
            </div>
            <div>
              <span className="price-unit">USD/Month</span>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default apartmentComponent;
