import mongoose, { Schema, type Document } from 'mongoose';

export interface IBorrow extends Document {
    userId: string;
    bookId: mongoose.Schema.Types.ObjectId;
    borrowDate: Date;
    returnDate: Date | null;
    status: 'borrowed' | 'returned';
    dueDate: Date;
}

const BorrowSchema: Schema = new Schema({
    userId: { type: String, required: true },
    bookId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Book',
        required: true 
    },
    borrowDate: { type: Date, default: Date.now },
    returnDate: { type: Date, default: null },
    status: { 
        type: String, 
        enum: ['borrowed', 'returned'], 
        default: 'borrowed' 
    },
    dueDate: { 
        type: Date, 
        required: true,
        default: () => {
            const date = new Date();
            date.setDate(date.getDate() + 14);
            return date;
        }
    }
});

export default mongoose.model<IBorrow>('Borrow', BorrowSchema);