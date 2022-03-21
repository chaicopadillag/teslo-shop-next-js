import jwt from 'jsonwebtoken';

type TokenPayloadType = {
  _id: string;
  email: string;
};
// gerate token
export const generateToken = (payload: TokenPayloadType) => jwt.sign(payload, process.env.JWT_SECRET_SEED || 'dev', { expiresIn: '12h' });

// verify match token
export const verifyToken = (token: string): Promise<TokenPayloadType> =>
  new Promise((resolve, reject) => {
    jwt.verify(token, process.env.JWT_SECRET_SEED || 'dev', (err, payload) => {
      if (err) {
        return reject('Invalid token');
      }
      return resolve(payload as TokenPayloadType);
    });
  });
