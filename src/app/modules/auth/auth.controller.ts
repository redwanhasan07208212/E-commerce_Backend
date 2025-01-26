import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { authService } from './auth.service';

const loginUser = catchAsync(async (req, res) => {
  const result = await authService.loginUser(req.body);
  const { token } = result;

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User is Login succesfully',
    data: {
      token,
    },
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

export const AuthControllers = {
  loginUser,
  registerUser,
};
