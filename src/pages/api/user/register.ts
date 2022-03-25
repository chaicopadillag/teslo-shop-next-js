import type { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';
import { db } from '../../../app/database';
import User from '../../../app/models/User';
import { jwt, validations } from '../../../helpers';
import { IUser } from '../../../interfaces';

type Data = { message: string } | { token: string; user: IUser };

export default function register(req: NextApiRequest, res: NextApiResponse<Data>) {
  switch (req.method) {
    case 'POST':
      return registerUser(req, res);

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
const registerUser = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  try {
    const { email = '', password = '', name = '' } = req.body as { email: string; password: string; name: string };

    if (!validations.isValidEmail(email)) {
      return res.status(422).json({
        message: 'El correo electrónico no parece ser válido',
      });
    }

    if (password.length < 6) {
      return res.status(422).json({
        message: 'La contraseña debe tener al menos 6 caracteres',
      });
    }

    if (name.length < 3) {
      return res.status(422).json({
        message: 'El nombre debe tener al menos 3 caracteres',
      });
    }

    await db.connect();
    const userEmail = await User.findOne({ email }).lean();

    if (userEmail) {
      await db.disconnect();
      return res.status(422).json({
        message: 'El correo electrónico ya está registrado',
      });
    }

    const user = await User.create({
      email: email.toLowerCase(),
      password: bcrypt.hashSync(password),
      role: 'CLIENT',
      name,
    });

    await db.disconnect();

    const token = jwt.generateToken({ _id: user._id, email: user.email });

    return res.status(200).json({
      token,
      user: {
        _id: user._id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: 'Internal Server Error',
    });
  }
};
