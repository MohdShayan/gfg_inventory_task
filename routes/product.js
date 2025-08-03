import express from 'express'
import { getAllProducts, handleProductCreation, deleteProduct } from '../controller/product.js';
import { isAdmin } from '../middleware/admin.js';
import { checkForAuthCookie } from '../middleware/auth.js';

const router = express.Router();

router.post('/add', checkForAuthCookie("gfgauthToken2"), isAdmin, handleProductCreation);
router.get('/', getAllProducts);
router.delete('/:id', checkForAuthCookie("gfgauthToken2"), isAdmin, deleteProduct);

export default router;