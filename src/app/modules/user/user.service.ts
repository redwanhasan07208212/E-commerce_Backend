import { JwtPayload } from 'jsonwebtoken';
import { User } from './user.model';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import QueryBuilder from '../../builder/queryBuilder';

export const getMyProfile = async (userData: JwtPayload) => {
  const user = await User.findOne({ email: userData.email }).select(
    '-password',
  );

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }

  if (user.isBlocked) {
    throw new AppError(httpStatus.FORBIDDEN, 'User is blocked');
  }

  return user;
};

/**
 * Retrieves all users based on the provided query parameters.
 */
export const getAllUsers = async (query: Record<string, unknown>) => {
  const queryBuilder = new QueryBuilder(User.find({ role: 'user' }), query);

  const users = await queryBuilder
    .search(['name', 'email'])
    .filter()
    .sort()
    .paginate()
    .fields()
    .modelQuery.select('-password -updatedAt');

  const total = await queryBuilder.getCountQuery();

  return {
    meta: {
      total,
      ...queryBuilder.getPaginationInfo(),
    },
    data: users,
  };
};

/**
 * Toggles the block status of a user.
 */
export const toggleBlockUser = async (
  userId: string,
  requester: JwtPayload,
) => {
  if (userId === requester.id.toString()) {
    throw new AppError(httpStatus.FORBIDDEN, 'You cannot block yourself');
  }

  const user = await User.findById(userId);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }

  const updatedUser = await User.findByIdAndUpdate(
    userId,
    { isBlocked: !user.isBlocked },
    { new: true },
  );

  return {
    message: `User ${updatedUser?.isBlocked ? 'blocked' : 'unblocked'} successfully`,
  };
};
export const userService = {
  getMyProfile,
  getAllUsers,
  toggleBlockUser,
};
