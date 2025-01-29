import { JwtPayload } from 'jsonwebtoken';
import { User } from './user.model';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';

const getMyProfile = async (userData: JwtPayload) => {
  const user = await User.isUserExistByCustomId(userData?.email);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User is not Found');
  }
  const isBlocked = user?.isBlocked;
  if (isBlocked) {
    throw new AppError(httpStatus.FORBIDDEN, 'User is Blocked');
  }

  return user;
};

const blockUser = async (id: string, userData: JwtPayload) => {
  const user = await User.findById(id);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }

  if (user._id.toString() === userData._id.toString()) {
    throw new AppError(httpStatus.FORBIDDEN, 'You can not block yourself');
  }

  await User.findByIdAndUpdate(id, {
    isBlocked: user.isBlocked ? false : true,
  });
};

export const userService = {
  getMyProfile,
  blockUser,
};
