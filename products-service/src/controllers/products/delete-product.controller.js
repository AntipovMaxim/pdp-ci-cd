import { BaseController } from '../../util/base-controller';
import { ProductsModel } from '../../models/product.model';


class DeleteProductController extends BaseController {
  async executeImpl () {
    try {
      const { id } = this.req.params;
      await ProductsModel.findOneAndDelete({ _id: id });

      return this.success({ message: 'Deleted successfully' });
    } catch (error) {
      return this.mongoFail(error);
    }
  }
}

export const deleteProduct = new DeleteProductController();
