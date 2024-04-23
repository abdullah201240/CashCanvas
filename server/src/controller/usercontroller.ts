import User from "../model/usermodel";
import{Request,Response} from "express";
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import AddCard from "../model/addCard";
import Transaction from "../model/transaction";
const defaultSecretKey = crypto.randomBytes(32).toString('hex');

import bcrypt from 'bcrypt';
const Signup = async (req: Request, res: Response) => {
    try {
        const { name, phone, email, password, address, nid } = req.body;

        if (!name || !phone || !email || !password || !address || !nid) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'User with this email already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({ name, phone, email, password: hashedPassword, address, nid });
        await newUser.save();

        return res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        console.error('Error in signup:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};
const Login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required' });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        const token = jwt.sign({ userId: user._id }, defaultSecretKey, { expiresIn: '1h' });

        const { name, phone,photo } = user;
        return res.status(200).json({
            message: 'Login successful',
            token, 

            data: { name, phone, email,photo,password} 
        });
    } catch (error) {
        console.error('Error in login:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};
const AddCards = async (req: Request, res: Response) => {
    try {
        const { email,cardNumber, cardType, ammount} = req.body;

        if (!email || !cardNumber || !cardType || !ammount) {
            return res.status(400).json({ error: 'All fields are required' });
        }
        const newCard = new AddCard({ cardNumber, cardType, ammount, email });
        await newCard.save();

        return res.status(201).json({ message: 'Card Add successfully' });
    } catch (error) {
        console.error('Error in Add Card:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};
const AllAccount = async (req: Request, res: Response) => {
    try {
        const { email } = req.query;
        console.log(email);

        if (!email) {
            return res.status(400).json({ error: 'Email is required' });
        }

        const accounts = await AddCard.find({  email: email  });

        return res.status(200).json({ accounts });
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};
const AllTransaction = async (req: Request, res: Response) => {
    try {
        const { email,cardNumber, cardType, ammount} = req.body;

        if (!email || !cardNumber || !cardType || !ammount) {
            return res.status(400).json({ error: 'All fields are required' });
        }
        const newCard = new AddCard({ cardNumber, cardType, ammount, email });
        await newCard.save();

        return res.status(201).json({ message: 'Card Add successfully' });
    } catch (error) {
        console.error('Error in Add Card:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};



export { Signup, Login,AddCards,AllAccount,AllTransaction };
