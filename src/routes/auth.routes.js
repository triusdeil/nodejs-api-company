import {Router} from 'express';
import * as authCtrl  from '../controllers/auth.controller';
import {verifySignup} from '../middlewares';
const router = Router();

router.post('/signin',authCtrl.signin)

router.post('/signup',[verifySignup.checkDuplicateUsernameOrEmail, verifySignup.checkRolesExisted],authCtrl.signup)

export default router;