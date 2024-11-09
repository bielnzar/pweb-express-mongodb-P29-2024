import type { IBorrow } from '../models/borrow.model';
import Borrow from '../models/borrow.model';
import Book from '../models/book.model';
import { isValidObjectId } from 'mongoose';

export class MechanismService {
    async borrowBook(userId: string, bookId: string): Promise<IBorrow> {
        try {
            if (!isValidObjectId(bookId)) {
                throw new Error('Invalid book ID format');
            }

            const book = await Book.findById(bookId);
            if (!book) {
                throw new Error('Book not found');
            }

            if (book.qty <= 0) {
                throw new Error('Book is not available for borrowing');
            }

            // Kurangi stok buku
            book.qty -= 1;
            await book.save();

            // Buat record peminjaman
            const borrow = new Borrow({
                userId,
                bookId
            });

            return await borrow.save();
        } catch (error) {
            if (error instanceof Error) {
                throw error;
            }
            throw new Error('Failed to borrow book');
        }
    }

    async returnBook(userId: string, bookId: string): Promise<IBorrow> {
        try {
            if (!isValidObjectId(bookId)) {
                throw new Error('Invalid book ID format');
            }

            const borrow = await Borrow.findOne({
                userId,
                bookId,
                status: 'borrowed'
            });

            if (!borrow) {
                throw new Error('No active borrowing found for this book');
            }

            borrow.status = 'returned';
            borrow.returnDate = new Date();
            await borrow.save();

            const book = await Book.findById(bookId);
            if (book) {
                book.qty += 1;
                await book.save();
            }

            return borrow;
        } catch (error) {
            if (error instanceof Error) {
                throw error;
            }
            throw new Error('Failed to return book');
        }
    }
}

export default new MechanismService();