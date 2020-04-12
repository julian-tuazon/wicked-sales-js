import React from 'react';

export default class CheckoutForm extends React.Component {
  constructor(props) {
    super(props);
    this.fields = ['name', 'card', 'address', 'agreement'];
    this.state = { name: '', card: '', address: '', agreement: false, invalid: Array.from(this.fields), showValidation: [] };
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
  }

  handleClick(e) {
    if (e.target.id === 'order') this.setState({ showValidation: Array.from(this.fields) });
    else this.props.setView('catalog', {});
  }

  handleChange(e) {
    const validationTests = {
      name: /^(?!.* {2,})[a-zA-Z ]*$/,
      card: /^[\d]*$/,
      address: /^(?!.* {2,})[a-zA-Z\d.,# ]*$/
    };
    const input = e.target;
    this.setState({ showValidation: this.state.showValidation.filter(elem => elem !== input.id) });
    if (input.id === 'agreement') {
      return this.setState({
        [e.currentTarget.id]: e.currentTarget.checked
      }, () => this.validateInput(input));
    }
    if (validationTests[input.id].test(input.value)) {
      this.setState({
        [input.id]: input.value
      }, () => this.validateInput(input));
    }
  }

  handleBlur(e) {
    const input = e.currentTarget;
    if (input.id === 'agreement') return this.setState({ showValidation: [...this.state.showValidation, input.id] });
    this.setState({
      showValidation: [...this.state.showValidation, input.id],
      [input.id]: this.state[input.id].trim()
    }, () => this.validateInput(input));
  }

  handleSubmit(e) {
    e.preventDefault();
    if (!this.state.invalid.length) {
      const { name, card, address } = this.state;
      this.props.placeOrder({ name, card, address });
    }
  }

  validateInput(input) {
    if (input.id === 'agreement') {
      if (this.state[input.id]) {
        return this.setState({ invalid: this.state.invalid.filter(elem => elem !== input.id) });
      }
    } else if (this.state[input.id].trim().length >= input.minLength) {
      return this.setState({ invalid: this.state.invalid.filter(elem => elem !== input.id) });
    }
    if (!this.state.invalid.includes(input.id)) {
      this.setState({ invalid: [...this.state.invalid, input.id] });
    }
  }

  setInputClassName(input) {
    if (input === 'agreement') return this.state.invalid.includes(input) && this.state.showValidation.includes(input) ? 'form-check-input is-invalid' : 'form-check-input';
    return this.state.invalid.includes(input) && this.state.showValidation.includes(input) ? 'form-control is-invalid' : 'form-control';
  }

  setButtonClassName() {
    return this.state.invalid.length ? 'btn btn-danger' : 'btn btn-primary';
  }

  getCartTotal() {
    return this.props.cart.reduce((acc, cur) => acc + cur.price, 0);
  }

  render() {
    return (
      <div className="container">
        <div className="col-md-7 mx-auto d-flex flex-column">
          <h2 className="mb-4">My Cart</h2>
          <h4 className="d-flex align-items-center text-muted mb-4">Cart Total: ${this.getCartTotal()}</h4>
          <form className="d-flex flex-column needs-validation mb-5" noValidate onSubmit={this.handleSubmit}>
            <div className="form-group mb-5">
              <label htmlFor="name">Name</label>
              <input type="text" id="name" className={this.setInputClassName('name')} value={this.state.name} onChange={this.handleChange} onBlur={this.handleBlur} minLength={5} maxLength={67} required />
              <small className="invalid-feedback position-absolute">Minimum of 5 characters required.</small>
            </div>
            <div className="form-group mb-5">
              <label htmlFor="card">Credit Card</label>
              <input type="text" id="card" className={this.setInputClassName('card')} value={this.state.card} onChange={this.handleChange} onBlur={this.handleBlur} minLength={16} maxLength={16} required />
              <small className="invalid-feedback position-absolute">Please enter a valid 16 digit card number.</small>
            </div>
            <div className="form-group mb-5">
              <label htmlFor="name">Shipping Address</label>
              <textarea type="textarea" id="address" className={this.setInputClassName('address')} value={this.state.address} rows="4" onChange={this.handleChange} onBlur={this.handleBlur} minLength={21} maxLength={156} required />
              <small className="invalid-feedback position-absolute">Minimum of 21 characters required.</small>
            </div>
            <div className="form-group mb-5">
              <div className="form-check">
                <input type="checkbox" id="agreement" className={this.setInputClassName('agreement')} checked={this.state.agreement} onChange={this.handleChange} onBlur={this.handleBlur} required />
                <label htmlFor="agreement" className="form-check-label">I accept that this website is for demonstration purposes only, that no payment processing will occur, and that personal information such as names, addresses, or real credit card numbers should not be used upon submission of this form.</label>
                <small className="invalid-feedback position-absolute">Please agree to the terms and conditions.</small>
              </div>
            </div>
            <div className="d-flex justify-content-between">
              <div className="mr-2">
                <button type="button" className="btn btn-outline-info" id="catalog" onClick={this.handleClick}>Back to Catalog</button>
              </div>
              <div>
                <button type="submit" className={this.setButtonClassName()} id="order" onClick={this.handleClick}>{this.state.invalid.length ? 'Incomplete Info' : 'Place Order'}</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
