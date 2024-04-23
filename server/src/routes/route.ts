import express from 'express';
import cors from 'cors';

import {Signup,Login,AddCards,AllAccount,AllTransaction,AllAmount} from '../controller/usercontroller'
const router = express.Router();
router.use(cors());

router.post("/Signup", Signup);
router.post('/Login', Login);

router.post('/AddCards', AddCards);
router.get('/AllAccount', AllAccount);


router.post('/AllTransaction', AllTransaction);
router.get('/AllAmount', AllAmount);


export default router;
