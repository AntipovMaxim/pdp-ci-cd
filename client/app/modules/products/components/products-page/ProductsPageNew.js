import React, { useState, useRef, useEffect } from 'react';
import './style.scss';
import { useProducts } from '../../hooks/useProducts';


const ProductsPageNew = () => {
  const {
    data,
    loadProducts,
    addProduct,
    updateProduct,
    deleteProduct
  } = useProducts();
  const products = data.payload;
  const [currentProductName, setProductName] = useState('');
  const [editableProductId, setEditableProduct] = useState(null);
  const inputEl = useRef(null);

  useEffect(() => {
    loadProducts();
    inputEl.current.focus();
  }, []);

  const onChangeProductName = (evt) => {
    setProductName(evt.target.value);
  };

  const openEditMode = (product) => {
    inputEl.current.focus();
    setEditableProduct(product.id);
    setProductName(product.name);
  };

  const onSubmitForm = (evt) => {
    if (evt !== undefined && evt.preventDefault) evt.preventDefault();
    if (!currentProductName) return;

    if (editableProductId) {
      updateProduct({ id: editableProductId, name: currentProductName });
      setEditableProduct(null);
    } else {
      addProduct(currentProductName);
    }

    setProductName('');
  };

  return (
    <article className="home-page">
      <section>
        <form
          className="form"
          onSubmit={onSubmitForm}
        >
          <label htmlFor="productName">
            <span className="form__label">Add products:</span>
            <input
              ref={inputEl}
              className="form__input"
              id="productName"
              type="text"
              placeholder="name"
              value={currentProductName}
              onChange={onChangeProductName}
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
              onClick={openEditMode.bind(null, product)}
              type="button"
              className="product-item__btn"
            >
              &#10000;
            </button>
            <button
              onClick={deleteProduct.bind(null, product.id)}
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
};

export default ProductsPageNew;
