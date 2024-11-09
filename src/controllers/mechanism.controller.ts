import type { Request, Response } from 'express';
import MechanismService from '../services/mechanism.service';

export class MechanismController {
    async borrowBook(req: Request, res: Response) {
        try {
            const { userId, bookId } = req.body;
            
            if (!userId || !bookId) {
                return res.status(400).json({
                    status: 'failed',
                    message: 'userId and bookId are required'
                });
            }

            const borrow = await MechanismService.borrowBook(userId, bookId);
            
            return res.status(200).json({
                status: 'success',
                message: 'Book borrowed successfully',
                data: borrow
            });
        } catch (error) {
            if (error instanceof Error) {
                return res.status(400).json({
                    status: 'failed',
                    message: error.message
                });
            }
            return res.status(500).json({
                status: 'error',
                message: 'Internal server error'
            });
        }
    }

    async returnBook(req: Request, res: Response) {
        try {
            const { userId, bookId } = req.body;
            
            if (!userId || !bookId) {
                return res.status(400).json({
                    status: 'failed',
                    message: 'userId and bookId are required'
                });
            }

            const borrow = await MechanismService.returnBook(userId, bookId);
            
            return res.status(200).json({
                status: 'success',
                message: 'Book returned successfully',
                data: borrow
            });
        } catch (error) {
            if (error instanceof Error) {
                return res.status(400).json({
                    status: 'failed',
                    message: error.message
                });
            }
            return res.status(500).json({
                status: 'error',
                message: 'Internal server error'
            });
        }
    }
}