import React from 'react';

export default function Header(props) {
  return (
    <div className="py-3 mx-0 mb-5 row text-white bg-dark sticky-top">
      <div className="col-11 mx-auto d-flex justify-content-between">
        <div className="btn text-light" onClick={() => props.setView('catalog', {})}>
          <i className="fas fa-dollar-sign mr-3"></i>
          Wicked Sales
        </div>
        <div className="btn text-light" onClick={() => props.setView('cart', {})}>
          {props.cartItemCount}{ props.cartItemCount === 1 ? ' Item' : ' Items' }
          <i className="fas fa-shopping-cart ml-3"></i>
        </div>
      </div>
    </div>
  );
}
