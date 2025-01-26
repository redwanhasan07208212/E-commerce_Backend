import jwt from 'jsonwebtoken';
export const createToken = (
  jwtPayload: { id: string; userEmail: string; role: string },
  secret: string,
  expiresIn: string,
) => {
  return jwt.sign(jwtPayload, secret, {
    expiresIn,
  });
};
