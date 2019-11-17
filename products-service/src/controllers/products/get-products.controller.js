import { BaseController } from '../../util/base-controller';
import { ProductsModel } from '../../models/product.model';

export class GetProductsController extends BaseController {
  async executeImpl() {
    try {
      const { userId } = this.req;
      const products = await ProductsModel.find({ userId });
      const response = products.map((product) => ({ id: product._id, name: product.name }));

      return this.success(response);
    } catch (error) {
      return this.mongoFail(error);
    }
  }
}

export const getProducts = new GetProductsController();
