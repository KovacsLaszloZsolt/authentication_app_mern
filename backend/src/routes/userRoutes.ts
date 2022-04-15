import { Router } from 'express';
// import { resolve } from 'path';
import { login, register, update, getUserDetails } from '../ controllers/userControllers';
import verifyAuthorization from '../middlewares/verifyAuthorization';
// import { uploadFileHandler } from '../middlewares/uploadFileHandler';
// import { USER } from '../models/userModel';

export const router = Router();

router.post('/register', register);

router.post('/login', login);

router.get('/:id', verifyAuthorization, getUserDetails);

router.put('/:id', verifyAuthorization, update);
