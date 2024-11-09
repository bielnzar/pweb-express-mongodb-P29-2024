import { Router } from 'express';
import { MechanismController } from '../controllers/mechanism.controller';
import type { Request, Response } from 'express';

const router = Router();
const mechanismController = new MechanismController();

// Tambahkan tipe Request dan Response
router.post('/borrow', (req: Request, res: Response) => {
    mechanismController.borrowBook(req, res);
});

router.post('/return', (req: Request, res: Response) => {
    mechanismController.returnBook(req, res);
});

export default router;