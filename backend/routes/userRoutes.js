import express from 'express';

const router = express.Router();
import {registerUser,authUser,allUsers} from '../controllers/userControllers.js'
import {protect} from '../middleware/authMiddleware.js'


router.route('/').post(registerUser).get(protect,allUsers)
router.post('/login',authUser)


export default router;