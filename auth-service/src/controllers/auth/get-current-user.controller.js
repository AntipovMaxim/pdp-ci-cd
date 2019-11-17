import { BaseController } from '../../utils/base-controller';
import { UsersModel } from '../../models/users.model';

export class GetCurrentUserController extends BaseController {
  async executeImpl() {
    try {
      const { _id: id, email } = await UsersModel.findById(this.req.userId);

      return this.success({ id, email });
    } catch (e) {
      return this.notFound();
    }
  }
}
