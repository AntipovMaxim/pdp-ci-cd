import { BaseController } from '../../utils/base-controller';
import { UsersModel } from '../../models/users.model';


export class RegisterController extends BaseController {
  async executeImpl() {
    const { body: { email, password } } = this.req;

    if (!email || !password) {
      return this.validationError('Email and password is required');
    }

    const finalUser = new UsersModel({ email, password });
    finalUser.setPassword(password);

    try {
      await finalUser.save();

      return this.created(finalUser.toAuthJSON());
    } catch (error) {
      return this.mongoFail(error);
    }
  }
}
