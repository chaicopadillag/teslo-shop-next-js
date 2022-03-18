import mongoose, { Schema, model, Model } from 'mongoose';
import { IUser } from '../../interfaces';

const UserSchema: Schema = new Schema(
  {
    name: { type: String, required: [true, 'El nombre del usuario es requerido'] },
    email: { type: String, required: [true, 'El correo del usuario es requerido'], unique: true },
    password: { type: String, required: true },
    role: { type: String, required: [true, 'El rol del usuario es requerido'], default: 'CLIENT' },
  },
  { timestamps: true }
);

const User: Model<IUser> = mongoose.models.User || model('User', UserSchema);

export default User;
