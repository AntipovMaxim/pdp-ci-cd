import { BaseController } from '../../utils/base-controller';
import { UsersModel } from '../../models/users.model';

export class LoginController extends BaseController {
  async executeImpl() {
    const { body: { email, password } } = this.req;

    if (!email || !password) {
      return this.validationError('Email and password is required');
    }

    try {
      const user = await UsersModel.findOne({ email });
      const isValidPassword = user.validatePassword(password);
      if (!isValidPassword) {
        return this.notFound();
      }

      return this.success(user.toAuthJSON());
    } catch (error) {
      return this.notFound();
    }
  }
}
