import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { userService } from './user.service';

const getMyProfile = catchAsync(async (req, res) => {
  const profile = await userService.getMyProfile(req.user);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User Profile get Successfully',
    data: profile,
  });
});
const getAllUser = catchAsync(async (req, res) => {
  const allProfile = await userService.getAllUsers(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All Profile get Successfully',
    data: allProfile,
  });
});
const blockUser = catchAsync(async (req, res) => {
  const { id } = req.params;
  const user = req.user;
  const result = await userService.toggleBlockUser(id, user);

  sendResponse(res, {
    statusCode: httpStatus.NO_CONTENT,
    success: true,
    data: result,
  });
});

export const userController = {
  getMyProfile,
  getAllUser,
  blockUser,
};
