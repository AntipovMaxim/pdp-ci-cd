import { BaseController } from '../../utils/base-controller';
import { UsersModel } from '../../models/users.model';


export class RegisterController extends BaseController {
  async executeImpl() {
    const { body: { user } } = this.req;

    if (!user.email || !user.password) {
      return this.validationError('Email and password is required');
    }

    const finalUser = new UsersModel(user);
    finalUser.setPassword(user.password);

    try {
      await finalUser.save();

      return this.created({ user: finalUser.toAuthJSON() });
    } catch (error) {
      return this.mongoFail(error);
    }
  }
}
