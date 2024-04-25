import express from 'express';
import cors from 'cors';

import {Signup,Login,AddCards,AllAccount,AllTransaction,AllAmount,DeleteAccount,AllCost,History,RecivedMoney,MoneyADD} from '../controller/usercontroller'
const router = express.Router();
router.use(cors());

router.post("/Signup", Signup);
router.post('/Login', Login);

router.post('/AddCards', AddCards);
router.get('/AllAccount', AllAccount);


router.post('/AllTransaction', AllTransaction);
router.get('/AllAmount', AllAmount);

router.delete('/DeleteAccount', DeleteAccount);

router.get('/AllCost', AllCost);


router.get('/History', History);

router.get('/RecivedMoney', RecivedMoney);
router.get('/MoneyADD', MoneyADD);



export default router;
