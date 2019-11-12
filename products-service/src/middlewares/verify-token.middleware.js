import { appConfig } from '../config/app.config';
import { httpRequest } from '../util/request';

const getTokenFromHeaders = (req) => {
  const { headers: { authorization } } = req;

  if (authorization && authorization.split(' ')[0] === 'Bearer') {
    return authorization.split(' ')[1];
  }
  return null;
};

export const verifyToken = (req, res, next) => {
  const token = getTokenFromHeaders(req);
  if (!token) {
    console.warn()
    return res.status(401).send({ auth: false, message: 'Authorization error' })
  };

  const { headers: { authorization } } = req;

  return httpRequest(`${appConfig.AUTH_API_URL}/api/v1/auth/current`, {
    headers: { 'Authorization': authorization },
  })
    .then(res =>  {
      req.userId = res.id;

      return next();
    })
    .catch(err => {
      if (err.response.status === 401) {
        return res.status(401).send({ auth: false, message: 'Authorization error' })
      }

      return next(err);
    });
};
