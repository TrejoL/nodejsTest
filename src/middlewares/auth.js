/* eslint-disable no-throw-literal */
const jwt = require('jsonwebtoken');

const isValidHostname = (req, res, next) => {
  const validHosts = ['google.com', 'localhost'];
  if (validHosts.includes(req.hostname)) {
    console.log('req.hostname', req.hostname);
    next();
  } else {
    res.status(400).send({ status: 'ACCES_DENIED' });
  }
};

const isAuth = (req, res, next) => {
  try {
    const { token } = req.headers;
    if (token) {
      const data = jwt.verify(token, process.env.JWT_SECRET);
      console.log('jwt data', data);
      if (data.userId !== req.body.userId && data.role !== 'admin') {
        throw {
          code: 403,
          status: 'ACCESS_DENIED',
          message: 'Missing permission or invalid role'
        };
      }
      req.sessionData = { userId: data.userId };
      next();
    } else {
      throw {
        code: 403,
        status: 'ACCESS_DENIED',
        message: 'Missing header token'
      };
    }
  } catch (error) {
    res
      .status(error.e || 500)
      .send({ status: error.status || 'ERROR', message: error.message });
  }

  //   const validHosts = ['google.com', 'localhost'];
  //   if (validHosts.includes(req.hostname)) {
  //     console.log('req.hostname', req.hostname);
  //     next();
  //   } else {
  //     res.status(400).send({ status: 'ACCES_DENIED' });
  //   }
};

module.exports = { isAuth, isValidHostname };
