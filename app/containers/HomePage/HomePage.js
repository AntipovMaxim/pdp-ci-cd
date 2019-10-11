import React from 'react';
import PropTypes from 'prop-types';
import './style.scss';

export default class HomePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      productName: '',
    };

    this.onChangeProductName = this.onChangeProductName.bind(this);
    this.onSubmitForm = this.onSubmitForm.bind(this);
  }

  componentDidMount() {
    const { loadProducts } = this.props;
    loadProducts();
  }

  onChangeProductName(evt) {
    this.setState({
      productName: evt.target.value,
    });
  }

  onSubmitForm(evt) {
    if (evt !== undefined && evt.preventDefault) evt.preventDefault();
    const { addProduct } = this.props;
    const { productName } = this.state;

    addProduct(productName);
  }

  render() {
    const { products } = this.props;
    const { productName } = this.state;

    return (
      <article className="home-page">
        <section>
          <form className="form" onSubmit={this.onSubmitForm}>
            <label htmlFor="productName">
              <span className="form__label">Add products:</span>
              <input
                className="form__input"
                id="productName"
                type="text"
                placeholder="name"
                value={productName}
                onChange={this.onChangeProductName}
              />
            </label>
          </form>
        </section>
        <section>
          <p><b>Products:</b></p>
          {products.map((product) => (<div key={product.name}>{product.name}</div>))}
        </section>
      </article>
    );
  }
}

HomePage.propTypes = {
  loadProducts: PropTypes.func,
  addProduct: PropTypes.func,
  products: PropTypes.array,
};
