import { BaseController } from '../../util/base-controller';
import { ProductsModel } from '../../models/product.model';


export class CreateProductController extends BaseController {
  async executeImpl() {
    const { name: newName } = this.req.body;
    const { userId } = this.req;
    const product = { name: newName, userId };

    if (!product.name) {
      this.validationError('Name is required');
    }

    try {
      const { _id: id, name } = await new ProductsModel(product).save();
      const response = { id, name };

      return this.created(response);
    } catch (error) {
      return this.mongoFail(error);
    }
  }
}
