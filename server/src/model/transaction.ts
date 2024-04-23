import mongoose, { Document, Model, Schema } from 'mongoose';

interface TransactionDocument extends Document {
    transactionType: string;
    cardType: string;
    ammount: string;
    email: string;
    cardNumber: string;
    
}

const transactionSchema = new Schema<TransactionDocument>({
    transactionType: {
        type: String,
        required: true
    },
    cardNumber: {
        type: String,
        required: true
    },
    cardType: {
        type: String,
        required: true
    },

    ammount: {
        type: String,
        required: true
    },
    
    email: {
        type: String,
        required: true
    },

}, { timestamps: true });

const Transaction: Model<TransactionDocument> = mongoose.model('Transaction', transactionSchema);

export default Transaction;
