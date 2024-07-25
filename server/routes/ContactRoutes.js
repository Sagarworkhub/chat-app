import { Router } from 'express';
import {
  searchContacts,
  getContactsForList,
} from '../controllers/ContactControllers.js';
import { verifyToken } from '../middlewares/AuthMiddleware.js';

const contactsRoutes = Router();

contactsRoutes.post('/search', verifyToken, searchContacts);
contactsRoutes.get('/get-contacts-for-list', verifyToken, getContactsForList);

export default contactsRoutes;
