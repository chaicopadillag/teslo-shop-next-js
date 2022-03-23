import bcrypt from 'bcryptjs';
import { User } from '../models';
import { db } from '../database';

/**
 *
 * @param email
 * @param password
 * @returns
 */
export const loginEmailPassword = async (email = '', password = '') => {
  try {
    await db.connect();

    const user = await User.findOne({ email }).lean();

    await db.disconnect();

    if (!user) {
      return null;
    }

    if (!bcrypt.compareSync(password, user.password as string)) {
      return null;
    }

    return {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    };
  } catch (error) {
    return null;
  }
};

export const loginOAuth = async (email: string, name: string, photoUrl = '') => {
  try {
    await db.connect();

    const user = await User.findOne({ email }).lean();

    if (user) {
      await db.disconnect();
      return {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      };
    }

    const newUser = await User.create({
      name,
      email,
      password: '@',
      role: 'CLIENT',
    });

    await db.disconnect();

    return {
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
    };
  } catch (error) {
    console.log(error);
    return null;
  }
};
