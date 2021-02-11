import {Router} from 'express';
const router = Router();
import * as userCtrl from '../controllers/user.controllers';
import {authJwt, verifySignup} from '../middlewares';
//listar usuarios
router.post('/',[
        authJwt.verifyToken,
        authJwt.isAdmin,
        verifySignup.checkRolesExisted
    ], userCtrl.createUser)
export default router;