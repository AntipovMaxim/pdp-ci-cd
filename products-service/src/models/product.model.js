import { Schema, model } from 'mongoose';

const productSchema = new Schema({
  name: String,
  userId: String,
}, {
  timestamps: true,
});

export const ProductsModel = model('Products', productSchema);
