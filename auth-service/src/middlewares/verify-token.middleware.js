import jwt from 'jsonwebtoken';
import { appConfig } from '../config/app.config';

const getTokenFromHeaders = (req) => {
  const { headers: { authorization } } = req;

  if (authorization && authorization.split(' ')[0] === 'Bearer') {
    return authorization.split(' ')[1];
  }
  return null;
};

export const verifyToken = (req, res, next) => {
  const token = getTokenFromHeaders(req);
  if (!token) return res.status(403).send({ auth: false, message: 'No token provided.' });

  return jwt.verify(token, appConfig.secret, (err, decoded) => {
    if (err) return res.status(401).send({ auth: false, message: 'Invalid token' });

    req.userId = decoded.id;
    return next();
  });
};
