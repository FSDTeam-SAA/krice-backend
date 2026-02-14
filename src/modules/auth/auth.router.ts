import { Router } from 'express';
import authController from './auth.controller';
import { authValidationSchema } from './auth.validation';
import { USER_ROLE } from '../user/user.constant';
import validateRequest from '../../middlewares/validateRequest';
import { loginLimiter } from '../../middlewares/security';
import auth from '../../middlewares/auth';

const router = Router();

router.post('/login', loginLimiter, validateRequest(authValidationSchema.authValidation), authController.login);

router.post('/register', validateRequest(authValidationSchema.registerValidation), authController.register);

router.post('/refresh-token', authController.refreshToken);
router.post('/forgot-password', authController.forgotPassword);

router.post('/resend-forgot-otp', auth(USER_ROLE.OWNER, USER_ROLE.EMPLOYER), authController.resendForgotOtpCode);

router.post('/verify-otp', auth(USER_ROLE.OWNER, USER_ROLE.EMPLOYER), authController.verifyOtp);

router.post('/reset-password', auth(USER_ROLE.OWNER, USER_ROLE.EMPLOYER), authController.resetPassword);

router.post('/change-password', auth(USER_ROLE.OWNER, USER_ROLE.EMPLOYER), authController.changePassword);

const authRouter = router;
export default authRouter;
