import User from "../model/usermodel";
import { Request, Response } from "express";
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import AddCard from "../model/addCard";
import Transaction from "../model/transaction";
const defaultSecretKey = crypto.randomBytes(32).toString('hex');

import bcrypt from 'bcrypt';
import mongoose from "mongoose";
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

        const { name, phone, photo } = user;
        return res.status(200).json({
            message: 'Login successful',
            token,

            data: { name, phone, email, photo, password }
        });
    } catch (error) {
        console.error('Error in login:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};
const AddCards = async (req: Request, res: Response) => {
    try {
        const { email, cardNumber, cardType, ammount } = req.body;

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

        const accounts = await AddCard.find({ email: email });

        return res.status(200).json({ accounts });
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};
const AllTransaction = async (req: Request, res: Response) => {
    try {
        const { transactionType, transactionName, email, cardNumber, cardType, ammount } = req.body;

        if (!transactionType || !transactionName || !email || !cardNumber || !cardType || !ammount) {
            return res.status(400).json({ error: 'All fields are required' });
        }



        const account = await AddCard.findOne({ email, cardType, cardNumber });

        if (!account) {
            return res.status(404).json({ error: 'Account not found' });
        }

        if (parseInt(account.ammount) < parseInt(ammount)) {
            return res.status(400).json({ error: 'Insufficient balance' });
        }
        if (transactionType === 'Sent money') {
            const user = await User.findOne({ phone: transactionName });

            if (!user) {
                return res.status(404).json({ error: 'User Not Found' });
            }
            const newBalance = parseInt(account.ammount) - parseInt(ammount);
            await AddCard.findOneAndUpdate({ email, cardType, cardNumber }, { $set: { ammount: newBalance } });

            const newTransaction = new Transaction({ transactionType, transactionName, cardNumber, cardType, ammount, email, status: 'Panding' });
            await newTransaction.save();

            return res.status(201).json({ message: 'Transaction successful' });
        }

        const newBalance = parseInt(account.ammount) - parseInt(ammount);
        await AddCard.findOneAndUpdate({ email, cardType, cardNumber }, { $set: { ammount: newBalance } });

        const newTransaction = new Transaction({ transactionType, transactionName, cardNumber, cardType, ammount, email });
        await newTransaction.save();

        return res.status(201).json({ message: 'Transaction successful' });

    } catch (error) {
        console.error('Error in Transaction:', error);

        if (error instanceof mongoose.Error.CastError) {
            return res.status(400).json({ error: 'Invalid data type provided' });
        }

        return res.status(500).json({ error: 'Internal Server Error' });
    }
};
const AllAmount = async (req: Request, res: Response) => {
    try {
        const { email } = req.query;

        if (!email) {
            return res.status(400).json({ error: 'Email is required' });
        }

        const accounts = await AddCard.find({ email: email });

        const totalAmount = accounts.reduce((total, account) => parseInt(String(total)) + parseInt(account.ammount), 0);

        return res.status(200).json({ totalAmount: totalAmount });
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};
const DeleteAccount = async (req: Request, res: Response) => {
    try {
        const { cardNumber, cardType, email } = req.query;
        const card = await AddCard.findOneAndDelete({ cardNumber, cardType, email });
        if (card) {
            return res.status(200).json({ message: 'Card deleted successfully' });
        } else {
            return res.status(404).json({ message: 'Card not found' });
        }
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error' });
    }
}

const AllCost = async (req: Request, res: Response) => {
    try {
        const { email } = req.query;
        const transactions = await Transaction.find({ email, transactionType: { $in: ["Sent money", "PayBill", "Payment"] } });

        const dailyTransactions = {};

        transactions.forEach(transaction => {
            const date = transaction._id.getTimestamp().toISOString().split('T')[0];
            if (!dailyTransactions[date]) {
                dailyTransactions[date] = 0;
            }
            dailyTransactions[date] += parseFloat(transaction.ammount);
        });

        return res.status(200).json({ dailyTransactions });
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error' });
    }
}

const History = async (req: Request, res: Response) => {
    try {
        const { email } = req.query;
        const transactions = await Transaction.find({ email }).sort({ createdAt: -1 });



        return res.status(200).json({ transactions });
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error' });
    }
}

const RecivedMoney = async (req: Request, res: Response) => {
    try {
        const { transactionName } = req.query;
        const transactions = await Transaction.find({ transactionName, transactionType: 'Sent money', status: "Panding" }).sort({ createdAt: -1 });



        return res.status(200).json({ transactions });
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error' });
    }
}
const MoneyADD = async (req: Request, res: Response) => {
    try {

        const { transactionType, transactionName, email, cardNumber, cardType, ammount, rcardNumber, rcardType } = req.body;
        if (!transactionType || !transactionName || !email || !cardNumber || !cardType || !ammount) {
            return res.status(400).json({ error: 'All fields are required' });
        }
        const account = await AddCard.findOne({ email, cardType, cardNumber });
        const newBalance = parseInt(account.ammount) + parseInt(ammount);
        await AddCard.findOneAndUpdate({ email, cardType, cardNumber }, { $set: { ammount: newBalance } });

        await Transaction.findOneAndUpdate({ transactionType: "Sent money", cardNumber: rcardNumber, cardType: rcardType, ammount }, { $set: { status: "Done" } });

        const newTransaction = new Transaction({ transactionType, transactionName, cardNumber, cardType, ammount, email });
        await newTransaction.save();
        return res.status(201).json({ message: 'Transaction successful' });


    } catch (error) {

        return res.status(500).json({ message: 'Internal server error' });

    }



}
const UpdateProfileImage = async (req: Request, res: Response) => {
    try {
        const { email } = req.body;

        if (!req.file) {
            return res.status(400).json({ message: 'Image not found' });
        }

        console.log('File uploaded:', req.file);

        const updatedUser = await User.findOneAndUpdate(
            { email: email },
            { photo: req.file.path },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'Profile updated successfully', user: updatedUser });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}
const Profile = async (req: Request, res: Response) => {
    try {
        const { email } = req.query;

        if (!email) {
            return res.status(400).json({ error: 'Email is required' });
        }
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        res.status(200).json(user);




    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });


    }



}











export { Signup, Login, AddCards, AllAccount, AllTransaction, AllAmount, DeleteAccount, AllCost, History, RecivedMoney, MoneyADD, UpdateProfileImage,Profile };
