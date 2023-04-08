const isAdmin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
      next(); // allow access to the route
    } else {
      res.status(401).send({ message: 'Unauthorized as admin' });
    }
  };
  
  module.exports = { isAdmin };
  