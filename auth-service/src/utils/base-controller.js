export class BaseController {
  executeImpl() {
    return Promise.resolve();
  }

  async execute(req, res, next) {
    this.req = req;
    this.res = res;

    try {
      await this.executeImpl();
    } catch (err) {
      console.log('[BaseController]: Error caught by controller');
      console.log(err);
      next();
    }
  }

  jsonResponse(code, message) {
    return this.res.status(code).json({ message });
  }

  success(dto) {
    if (dto) {
      return this.res.status(200).json(dto);
    }
    return this.res.sendStatus(200);
  }

  created(dto) {
    if (dto) {
      return this.res.status(201).json(dto);
    }
    return this.res.sendStatus(201);
  }

  clientError(message) {
    return this.jsonResponse(400, message || 'Bad request');
  }

  unauthorized(message) {
    return this.jsonResponse(401, message || 'Unauthorized');
  }

  forbidden(message) {
    return this.jsonResponse(403, message || 'Forbidden');
  }

  notFound(message) {
    return this.jsonResponse(404, message || 'Not found');
  }

  conflict(message) {
    return this.jsonResponse(409, message || 'Conflict');
  }

  tooMany(message) {
    return this.jsonResponse(429, message || 'Too many requests');
  }

  fail(error) {
    const errMsg = error.message || 'Request failed';

    return this.jsonResponse(500, errMsg);
  }


  validationError(message) {
    return this.jsonResponse(412, message || 'Validation error');
  }

  mongoFail(err) {
    if (err.name === 'ValidationError') {
      return this.clientError(err.message);
    }
    const errMsg = err.message || 'DB failed';

    return this.clientError(errMsg);
  }
}
