import type { NextApiRequest, NextApiResponse } from 'next';
import { User } from '../../../app/models';
import bcrypt from 'bcryptjs';
import { IUser } from '../../../interfaces';
import { db } from '../../../app/database';
import { jwt } from '../../../helpers';

type Data = { message: string } | { token: string; user: IUser };

export default function login(req: NextApiRequest, res: NextApiResponse<Data>) {
  switch (req.method) {
    case 'POST':
      return loginUser(req, res);

    default:
      return res.status(405).json({
        message: 'Method Not Allowed',
      });
  }
}

/**
 *
 * @param req
 * @param res
 */
const loginUser = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  try {
    const { email = '', password = '' } = req.body as { email: string; password: string };

    await db.connect();

    const user = await User.findOne({ email }).select('name email role password').lean();
    await db.disconnect();

    if (!user) {
      return res.status(401).json({
        message: 'Correo electrónico o contraseña no válidos',
      });
    }

    if (!bcrypt.compareSync(password, user.password!)) {
      return res.status(401).json({
        message: 'Correo electrónico o contraseña no válidos',
      });
    }

    const token = jwt.generateToken({ _id: user._id, email: user.email });

    delete user.password;

    return res.status(200).json({
      token,
      user,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: 'Internal Server Error',
    });
  }
};
