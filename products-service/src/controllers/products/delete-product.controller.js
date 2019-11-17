import { BaseController } from '../../util/base-controller';
import { ProductsModel } from '../../models/product.model';


export class DeleteProductController extends BaseController {
  async executeImpl() {
    try {
      const { id } = this.req.params;
      await ProductsModel.findOneAndDelete({ _id: id });

      return this.success({ message: 'Deleted successfully' });
    } catch (error) {
      return this.mongoFail(error);
    }
  }
}
