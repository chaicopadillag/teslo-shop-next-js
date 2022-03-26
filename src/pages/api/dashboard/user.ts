import type { NextApiRequest, NextApiResponse } from 'next';
import { isValidObjectId } from 'mongoose';
import { db } from '../../../app/database';
import { User } from '../../../app/models';
import { IUser } from '../../../interfaces';

type Data =
  | {
      message: string;
    }
  | IUser[];

export default function handlerUser(req: NextApiRequest, res: NextApiResponse<Data>) {
  switch (req.method) {
    case 'GET':
      return getAllUsers(req, res);

    case 'PUT':
      return updateUser(req, res);

    default:
      break;
  }
}

const getAllUsers = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  try {
    await db.connect();

    const users = await User.find();

    await db.disconnect();

    return res.status(200).json(users);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: 'Error internal server',
    });
  }
};
const updateUser = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  try {
    const { id, role } = req.body as { id: string; role: string };

    if (!isValidObjectId(id)) {
      return res.status(422).json({
        message: 'Invalid id',
      });
    }
    const roles = ['ADMIN', 'SEO', 'CLIENT'];
    if (!roles.includes(role)) {
      return res.status(422).json({
        message: 'Invalid role',
      });
    }
    await db.connect();
    const user = await User.findById(id);
    if (!user) {
      await db.disconnect();
      return res.status(404).json({
        message: 'User not found',
      });
    }

    user.role = role;
    await user.save();
    await db.disconnect();

    return res.status(200).json({
      message: 'User updated',
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: 'Error internal server',
    });
  }
};
