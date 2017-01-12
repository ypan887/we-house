import React, { Component } from 'react';

let apartmentDatas = require('../data/apartment.json');

class apartmentComponent extends Component {

  render() {
    let currentId = this.props.params.id
    let apartment = apartmentDatas.apartments.find((a) => {
      return currentId == a.id
    })

    apartment.imageURL = require('../images/' + apartment.image);

    return(
      <div className="row apartment-detail">
        <div className="col-sm-10 col-sm-offset-1">
          <div>
            <h1>{ apartment.name }</h1>
          </div>
          <div>
            <figure>
              <img
                src={ apartment.imageURL }
                alt={ apartment.name }
              />
            </figure>
          </div>
        </div>
      </div>
    )
  }
}

export default apartmentComponent;
