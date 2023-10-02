import { body } from "express-validator";

export const loginValidation = [
   body('email', 'Incorrect mail format').isEmail(),
   body('password', 'Password must be minimum 5 symbols').isLength({ min: 5 }),
];

export const registerValidation = [
   body('email', 'Incorrect mail format').isEmail(),
   body('password', 'Password must be minimum 5 symbols').isLength({ min: 5 }),
   body('fullName', 'Enter fullname').isLength({ min: 3 }),
   body('avatarUrl', 'Incorrect avatar link').optional().isURL(),
];

export const postCreateValidation = [
    body('title', 'Enter article title').isLength({ min: 3 }).isString(),
    body('text', 'Enter text title').isLength({ min: 10 }).isString(),
    body('tags', 'Incorrect tag format').optional().isString(),
    body('imageUrl', 'Incorrect image link').optional().isString(),
 ];