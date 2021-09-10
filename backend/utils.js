import jwt from "jsonwebtoken";

export const generateToken = (user) => {
  return jwt.sign({
    _id: user._id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin
  }, process.env.JWT_SECRET || 'replaceforsomethingsecret',
    {
      expiresIn: '30d'
    });
};

export const isAuth = (req, res, next) => {
  const authorization = req.headers.authorization;
  if (authorization) {
    const token = authorization.slice(7, authorization.length);
    jwt.verify(token, process.env.JWT_SECRET || 'replaceforsomethingsecret',
      (err, decode) => {
        if (err) {
          req.status(401).send({ message: 'Invalid Token' });
        } else {
          req.user = decode;
          next();
        }
      });
  } else {
    req.status(401).send({ message: 'No token' });
  }
}
