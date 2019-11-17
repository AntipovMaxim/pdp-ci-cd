import { BaseController } from '../../util/base-controller';
import { ProductsModel } from '../../models/product.model';


class UpdateProductController extends BaseController {
  async executeImpl() {
    const { body: product, params: { id: productId } } = this.req;

    if (!product.name) {
      return this.validationError('Name is required');
    }

    try {
      const { _id: id, name } = await ProductsModel.findOneAndUpdate({ _id: productId }, { $set: product }, { new: true });
      const response = { id, name };

      return this.created(response);
    } catch (error) {
      return this.mongoFail(error);
    }
  }
}

export const updateProduct = new UpdateProductController();
