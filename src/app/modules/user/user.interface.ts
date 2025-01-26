/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';
import { USER_ROLE } from './user.constant';

export type Tuser = {
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'user';
  isBlocked?: boolean;
};

export interface UserModel extends Model<Tuser> {
  isUserExistByCustomId(email: string): Promise<Tuser>;
}
export type TUserRole = keyof typeof USER_ROLE;
