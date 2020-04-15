import React from 'react';

export default class CartSummaryItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = { showModal: false, quantity: this.props.item.quantity };
    this.updateQuantity = this.updateQuantity.bind(this);
    this.removeCartItem = this.removeCartItem.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
  }

  handleChange(e) {
    const input = e.target;
    const validNum = /(?!^0)(^[\d]*$)/;
    if (validNum.test(input.value)) this.setState({ quantity: input.value });
  }

  handleBlur(e) {
    if (!this.state.quantity) {
      return this.setState({
        quantity: 1
      }, () => this.props.updateQuantity(this.props.item.productId, Number(this.state.quantity)));
    }
    this.props.updateQuantity(this.props.item.productId, Number(this.state.quantity));
  }

  updateQuantity(e) {
    if (!this.props.canClick) return;
    if (e.currentTarget.id === 'plus' && this.props.item.quantity < 99) {
      return this.setState({
        quantity: Number(this.state.quantity) + 1
      }, () => this.props.updateQuantity(this.props.item.productId, this.state.quantity));
    }
    if (e.currentTarget.id === 'minus' && this.props.item.quantity > 1) {
      return this.setState({
        quantity: Number(this.state.quantity) - 1
      }, () => this.props.updateQuantity(this.props.item.productId, this.state.quantity));
    }
  }

  setMinusButtonStatus() {
    return (this.props.item.quantity > 1) ? 'btn ml-2 text-primary' : 'btn ml-2 disabled';
  }

  setPlusButtonStatus() {
    return (this.props.item.quantity < 99) ? 'btn text-primary' : 'btn disabled';
  }

  removeCartItem() {
    this.setState({ showModal: true });
  }

  renderModal() {
    const modalClassName = this.state.showModal ? 'modal overlay d-block' : 'modal overlay';
    const hideModal = e => this.setState({ showModal: false });
    const removeItem = () => this.props.deleteFromCart(this.props.item.productId);

    return (
      <div className={modalClassName} tabIndex="-1" role="dialog">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Confirm Item Removal</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={hideModal}>
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <p>
                <i className="far fa-times-circle text-danger mr-2"></i>
                Remove {this.props.item.name} ({this.props.item.quantity}) from your cart?
              </p>
            </div>
            <div className="modal-footer">
              <div className="btn-group w-75 mx-auto">
                <button type="button" id="remove" className="btn btn-danger w-25" onClick={removeItem}>Remove</button>
                <button type="button" id="cancel" className="btn btn-secondary w-25" onClick={hideModal} data-dismiss="modal">Cancel</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className="card card-body d-flex flex-column flex-md-row justify-content-between mb-4">
        {this.renderModal()}
        <img
          src={this.props.item.image}
          className="col-md-4 mb-4 mb-md-0 px-0 py-2"
          alt={this.props.item.name} />
        <div className="d-flex flex-column justify-content-center col-md-7 px-0">
          <h4 className="card-title">{this.props.item.name}</h4>
          <div>
            <p className="d-inline-block text-success border border-success rounded p-2">${this.props.item.price}</p>
          </div>
          <p>{this.props.item.shortDescription}</p>
          <div className="form-group d-flex align-items-center mb-3">
            <label htmlFor="quantity" className="mb-0">Quantity:</label>
            <button type="button" id="minus" className={this.setMinusButtonStatus()} onClick={this.updateQuantity}>
              <i className="fas fa-minus fa-xs"></i>
            </button>
            <input type="text" className="text-center mx-1" value={this.state.quantity} onChange={this.handleChange} onBlur={this.handleBlur} minLength={1} maxLength={2} size={2} required />
            <button type="button" id="plus" className={this.setPlusButtonStatus()} onClick={this.updateQuantity}>
              <i className="fas fa-plus fa-xs"></i>
            </button>
          </div>
          <div>
            <button type="button" id="delete" className="btn text-secondary px-0" onClick={this.removeCartItem}>
              <i className="fas fa-times text-secondary fa-sm mr-2"></i>
              Remove
            </button>
          </div>
        </div>
      </div>
    );
  }
}
