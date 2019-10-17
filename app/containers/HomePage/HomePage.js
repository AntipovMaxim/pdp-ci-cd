import React from 'react';
import PropTypes from 'prop-types';
import './style.scss';

export default class HomePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      currentProductName: '',
      editableProductId: null,
    };

    this.onChangeProductName = this.onChangeProductName.bind(this);
    this.onSubmitForm = this.onSubmitForm.bind(this);
    this.getInputRef = this.getInputRef.bind(this);
  }

  componentDidMount() {
    const { loadProducts } = this.props;
    loadProducts();
    this.textInput.focus();
  }

  onChangeProductName(evt) {
    this.setState({
      currentProductName: evt.target.value,
    });
  }

  onSubmitForm(evt) {
    if (evt !== undefined && evt.preventDefault) evt.preventDefault();
    const { addProduct, updateProduct } = this.props;
    const { currentProductName, editableProductId } = this.state;
    if (!currentProductName) return;

    if (editableProductId) {
      updateProduct({ id: editableProductId, name: currentProductName });
      this.setState({
        editableProductId: null,
      });
    } else {
      addProduct(currentProductName);
    }

    this.setState({
      currentProductName: '',
    });
  }

  getInputRef(elem) {
    this.textInput = elem;
  }

  openEditMode(product) {
    this.textInput.focus();
    this.setState({
      editableProductId: product.id,
      currentProductName: product.name,
    });
  }

  render() {
    const { products, deleteProduct } = this.props;
    const { currentProductName } = this.state;

    return (
      <article className="home-page">
        <section>
          <form
            className="form"
            onSubmit={this.onSubmitForm}
          >
            <label htmlFor="productName">
              <span className="form__label">Add products:</span>
              <input
                ref={this.getInputRef}
                className="form__input"
                id="productName"
                type="text"
                placeholder="name"
                value={currentProductName}
                onChange={this.onChangeProductName}
              />
            </label>
          </form>
        </section>
        <section>
          <p><b>Products:</b></p>
          {products.length ? products.map((product) => (
            <div
              key={product.id}
              className="product-item"
            >
              <div className="product-item__name">{product.name}</div>
              <button
                onClick={this.openEditMode.bind(this, product)}
                type="button"
                className="product-item__btn"
              >
                &#10000;
              </button>
              <button
                onClick={deleteProduct.bind(this, product.id)}
                type="button"
                className="product-item__btn"
              >
                &#9766;
              </button>
            </div>
          )) : 'Please add products...'}
        </section>
      </article>
    );
  }
}

HomePage.propTypes = {
  loadProducts: PropTypes.func,
  addProduct: PropTypes.func,
  deleteProduct: PropTypes.func,
  updateProduct: PropTypes.func,
  products: PropTypes.array,
};
