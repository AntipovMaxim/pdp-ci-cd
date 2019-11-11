import { UsersModel } from '../models/users.model';

export const register = (req, res) => {
  const { body: { user } } = req;

  if (!user.email || !user.password) {
    return res.status(412).json({ title: 'Validation Error', error: 'Email and password is required' });
  }

  const finalUser = new UsersModel(user);
  finalUser.setPassword(user.password);

  return finalUser.save()
    .then(() => res.json({ user: finalUser.toAuthJSON() }));
};

export const login = (req, res) => {
  const { body: { user: { email, password } } } = req;

  if (!email || !password) {
    return res.status(412).json({ title: 'Validation Error', error: 'Email and password is required' });
  }

  return UsersModel.findOne({ email }, (err, user) => {
    if (err) return res.status(500).send('Error on the server.');
    if (!user) return res.status(404).send('No user found.');

    const isValidPassword = user.validatePassword(password);
    if (!isValidPassword) return res.status(401).send({ auth: false, token: null });

    return res.json({ user: user.toAuthJSON() });
  });
};

export const getCurrentUser = (req, res) => {
  UsersModel.findById(req.userId, (err, user) => {
    if (err) return res.status(500).send('There was a problem finding the user.');
    if (!user) return res.status(404).send('No user found.');
    return res.status(200).send(user);
  });
};
