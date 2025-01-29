import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { authService } from './auth.service';
import config from '../../config';

const loginUser = catchAsync(async (req, res) => {
  const result = await authService.loginUser(req.body);
  const { token } = result;
  const { refreshToken } = result;

  res.cookie('refreshToken', refreshToken, {
    secure: config.NODE_ENV === 'production',
    httpOnly: true,
  });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User is Login successfully',
    data: {
      token,
    },
  });
});
const logOut = catchAsync(async (req, res) => {
  res.clearCookie('refreshToken');

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User is LogOut successfully',
  });
});
const refreshToken = catchAsync(async (req, res) => {
  const { refreshToken } = req.cookies;
  const result = await authService.refreshToken(refreshToken);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Access Token Retrieved successfully',
    data: result,
  });
});
const registerUser = catchAsync(async (req, res) => {
  const user = await authService.registerUserIntoDb(req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    message: 'User registered successfully',
    success: true,
    data: user,
  });
});
const changePassword = catchAsync(async (req, res) => {
  const { ...passwordData } = req.body;
  const change_password = await authService.changePassword(
    req.user,
    passwordData,
  );

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    message: 'User Changed Password successfully',
    success: true,
    data: change_password,
  });
});
export const AuthControllers = {
  loginUser,
  logOut,
  registerUser,
  changePassword,
  refreshToken,
};
