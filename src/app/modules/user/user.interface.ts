/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';
import { USER_ROLE } from './user.constant';

export type Tuser = {
  save(): unknown;
  name: string;
  email: string;
  password: string;
  phone: number;
  address: string;
  role: 'admin' | 'user';
  isBlocked?: boolean;
  passwordChangedAt: Date;
};

export interface UserModel extends Model<Tuser> {
  isUserExistByCustomId(email: string): Promise<Tuser>;
  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean>;
  isJWTIssuedBeforePasswordChange(
    passwordChangeTimeStamp: Date,
    jwtIssuedTimeStamps: number,
  ): boolean;
}
export type TUserRole = keyof typeof USER_ROLE;
