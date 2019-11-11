import { Schema, model } from 'mongoose';

const productSchema = new Schema({
  name: String,
}, {
  timestamps: true,
});

productSchema.statics = {
  create(data, cb) {
    const product = new this(data);
    product.save(cb);
  },

  get(query, cb) {
    this.find(query, cb);
  },

  update(query, updateData, cb) {
    this.findOneAndUpdate(query, { $set: updateData }, { new: true }, cb);
  },

  delete(query, cb) {
    this.findOneAndDelete(query, cb);
  }
};

export const ProductsModel = model('Products', productSchema);
