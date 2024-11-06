import { Router } from 'express';
import { BookController } from '../controllers/book.controller';

const router = Router();
const bookController = new BookController();

router.post('/', bookController.addBook);
router.get('/', bookController.getAllBooks);
router.get('/:id', bookController.getBookById);
router.patch('/:id', bookController.modifyBook);
router.delete('/:id', bookController.removeBook);

export default router;