import React from 'react';
import CartSummaryItem from './cart-summary-item';

export default function CartSummary(props) {
  if (props.cart.length === 0) return <h1 className="text-center">Cart is empty</h1>;

  const cartItems = props.cart.map(item =>
    <CartSummaryItem item={item} key={item.productId} />
  );
  const totalPrice = props.cart.reduce((acc, cur) => acc + cur.price, 0);

  return (
    <div className="row mx-0">
      <div className="d-flex flex-column col-7 mx-auto">
        <div className="text-muted mb-4 pt-0 px-0 btn d-flex justify-content-start"
          onClick={() => props.setView('catalog', {})}>
          Back to catalog
        </div>
        <h2 className="mb-4">My Cart</h2>
        {cartItems}
        <h5 className="mt-3 mb-5 text-muted">Total Price: ${totalPrice}</h5>
      </div>
    </div>
  );
}