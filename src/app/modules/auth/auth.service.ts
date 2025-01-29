import httpStatus from 'http-status';
import config from '../../config';
import AppError from '../../errors/AppError';
import { Tuser } from '../user/user.interface';
import { User } from '../user/user.model';
import { TLoginUser } from './auth.interface';
import { createToken } from './auth.utils';
import { JwtPayload } from 'jsonwebtoken';
import jwt from 'jsonwebtoken';
const loginUser = async (payLoad: TLoginUser) => {
  const user = await User.isUserExistByCustomId(payLoad?.email);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found');
  }

  const isUserBlocked = user?.isBlocked;
  if (isUserBlocked) {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked');
  }

  const isPasswordMatched = await User.isPasswordMatched(
    payLoad?.password,
    user?.password,
  );
  if (!isPasswordMatched) {
    throw new AppError(
      httpStatus.FORBIDDEN,
      'Password do not matched. Please use Correct Password',
    );
  }

  const jwtPayload = {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    id: user._id,
    userEmail: user.email,
    role: user.role,
  };
  const token = createToken(
    jwtPayload,
    config.JWT_ACCESS_SECRET as string,
    config.JWT_ACCESS_EXPIRES_IN as string,
  );

  const refreshToken = createToken(
    jwtPayload,
    config.JWT_REFRESH_SECRET as string,
    config.JWT_REFRESH_EXPIRES_IN as string,
  );

  return {
    token,
    refreshToken,
  };
};
const refreshToken = async (token: string) => {
  const decoded = jwt.verify(
    token,
    config.JWT_REFRESH_SECRET as string,
  ) as JwtPayload;

  const { userEmail, iat } = decoded;
  const user = await User.isUserExistByCustomId(userEmail);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found');
  }
  const isUserBlocked = user?.isBlocked;
  if (isUserBlocked) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is blocked');
  }

  if (
    user.passwordChangedAt &&
    User.isJWTIssuedBeforePasswordChange(user.passwordChangedAt, iat as number)
  ) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'You are not Authorized');
  }

  const jwtPayload = {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    id: user._id,
    userEmail: user.email,
    role: user.role,
  };
  const accessToken = createToken(
    jwtPayload,
    config.JWT_ACCESS_SECRET as string,
    config.JWT_ACCESS_EXPIRES_IN as string,
  );

  return {
    accessToken,
  };
};

const registerUserIntoDb = async (payload: Tuser) => {
  const existUser = await User.isUserExistByCustomId(payload?.email);
  if (existUser) {
    throw new AppError(httpStatus.CONFLICT, 'User is Already Exist');
  }
  const newUser = (await User.create(payload)).toObject();
  const result = {
    _id: newUser._id,
    name: newUser.name,
    email: newUser.email,
  };

  const jwtPayload = {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    id: newUser._id,
    userEmail: newUser.email,
    role: newUser.role,
  };
  const accessToken = createToken(
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    jwtPayload,
    config.JWT_ACCESS_SECRET as string,
    config.JWT_ACCESS_EXPIRES_IN as string,
  );

  const refreshToken = createToken(
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    jwtPayload,
    config.JWT_REFRESH_SECRET as string,
    config.JWT_REFRESH_EXPIRES_IN as string,
  );

  return {
    accessToken,
    refreshToken,
    result,
  };
};
const changePassword = async (
  userData: JwtPayload,
  payLoad: { oldPassword: string; newPassword: string },
) => {
  const user = await User.isUserExistByCustomId(userData?.userEmail);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found');
  }

  const isUserBlocked = user?.isBlocked;
  if (isUserBlocked) {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked');
  }

  const isPasswordMatched = await User.isPasswordMatched(
    payLoad?.oldPassword,
    user?.password,
  );
  if (!isPasswordMatched) {
    throw new AppError(
      httpStatus.FORBIDDEN,
      'Password do not matched. Please use Correct Password',
    );
  }

  user.password = payLoad.newPassword;
  user.passwordChangedAt = new Date();
  await user.save();
};
export const authService = {
  loginUser,
  registerUserIntoDb,
  changePassword,
  refreshToken,
};
