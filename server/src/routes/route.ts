import express from 'express';
import cors from 'cors';

import {Signup,Login} from '../controller/usercontroller'
const router = express.Router();
router.use(cors());

router.post("/Signup", Signup);
router.post('/Login', Login);
export default router;
