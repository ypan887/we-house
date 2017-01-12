import React, { Component } from 'react';

class apartmentComponent extends Component {
  render() {
    return(
      <div className="row apartment">
        <div className="col-sm-5 col">
          <div className="list-image">
            <figure>
              <img
                src={ this.props.data.imageURL }
                alt={ this.props.data.title }
              />
            </figure>
          </div>
        </div>
        <div className="col-sm-7 col">
          <div className="list-content">
            <div className="list-title">
              <h2>{ this.props.data.name }</h2>
            </div>
            <div className="list-desc">
              <p>{ this.props.data.description }</p>
            </div>
            <div className="price">
              <div>
                <span className="price-prefix">From </span>
                <span className="price-value">${ this.props.data.price }</span>
              </div>
              <div className="price-unit">USD / Month</div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default apartmentComponent;
