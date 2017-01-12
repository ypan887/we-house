import React, { Component } from 'react';

class apartmentComponent extends Component {
  handleHover(){
    this.props.focus();
  }

  render() {
    let [address, city] = this.props.data.description.split("|");
    let listContentClassName = 'list-content'

    if (this.props.data.isFocus) {
      listContentClassName += ' is-Focus';
    }

    return(
      <div className="row apartment" onMouseEnter={this.handleHover.bind(this)}
    onMouseLeave={this.handleHover.bind(this)}>
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
          <div className={ listContentClassName }>
            <div className="list-title">
              <h2>{ this.props.data.name }</h2>
            </div>
            <div className="list-desc">
              <p>{ address }</p>
              <p>{ city }</p>
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
