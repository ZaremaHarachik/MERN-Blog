import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import { validationResult } from 'express-validator';

import { registerValidation } from './validations/auth.js';
// import  UserModel  from './models/User.js';

mongoose
.connect('mongodb+srv://admin:wwwwww@cluster1.ylt5jzi.mongodb.net/?retryWrites=true&w=majority')
.then(() => console.log('Data Base OK'))
.catch((err) => console.log('Data Base error', err));


const app = express();

app.use(express.json());

app.post('/auth/register', registerValidation, async (req, res) => {
   const errors = validationResult(req);
   if (!errors.isEmpty()) {
    return res.status(400).json(errors.array());
   }
    
   const password = req.body.password;
   const salt = await bcrypt.genSalt(10);
   const passwordHash = await bcrypt.hash(password, salt);

   const doc = new UserModel({
    email: req.body.email,
    fullName: req.body.fullName,
    avatarUrl: req.body.avatarUrl,
    passwordHash: req.body.avatarUrl,
    passwordHash,
});

const user = await doc.save();

   res.json(user);
});

app.listen(4444, (err) => {
    if (err) {
        return console.log(err);
    }
    console.log('Server OK');
});
