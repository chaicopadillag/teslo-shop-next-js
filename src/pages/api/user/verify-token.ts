import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../app/database';
import { User } from '../../../app/models';
import { jwt } from '../../../helpers';
import { IUser } from '../../../interfaces';

type Data = { message: string } | { token: string; user: IUser };

export default function verifyToken(req: NextApiRequest, res: NextApiResponse<Data>) {
  switch (req.method) {
    case 'GET':
      return verifyTokenUser(req, res);

    default:
      return res.status(405).json({
        message: 'Method Not Allowed',
      });
  }
}
const verifyTokenUser = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  try {
    const { token = '' } = req.cookies as { token: string };

    if (!token) {
      return res.status(401).json({
        message: 'El token no parece ser válido',
      });
    }

    const payload = await jwt.verifyToken(token);

    await db.connect();

    const user = await User.findById(payload._id);

    await db.disconnect();

    if (!user) {
      return res.status(401).json({
        message: 'El usuario no existe en la base de datos',
      });
    }

    const newToken = jwt.generateToken({ _id: user._id, email: user.email });

    // res.setHeader('Set-Cookie', [`token=${newToken}; Path=/; httpOnly;`]);

    return res.status(200).json({
      token: newToken,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    return res.status(401).json({
      message: 'Invalid token',
    });
  }
};
