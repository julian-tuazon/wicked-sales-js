import React from 'react';

export default function CartSummaryItem(props) {
  return (
    <div className= "card card-body mb-4 d-flex flex-column flex-md-row justify-content-between">
      <img
        src={props.item.image}
        className="col-md-4 mb-4 mb-md-0 px-0 py-2"
        alt={props.item.name} />
      <div className="d-flex flex-column justify-content-center col-md-7 px-0">
        <h4 className="card-title">{props.item.name}</h4>
        <div>
          <p className="btn btn-outline-success">${props.item.price}</p>
        </div>
        <p>{props.item.shortDescription}</p>
      </div>
    </div>
  );
}
