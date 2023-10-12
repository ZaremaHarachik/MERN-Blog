import express from 'express';

import mongoose from 'mongoose';

import { loginValidation, postCreateValidation, registerValidation } from './validations.js';

import checkAuth from './utils/checkAuth.js';
import * as UserController from './controllers/UserController.js';
import * as PostController from './controllers/PostController.js';

mongoose
.connect('mongodb+srv://admin:wwwwww@cluster1.ylt5jzi.mongodb.net/blog?retryWrites=true&w=majority')
.then(() => console.log('Data Base OK'))
.catch((err) => console.log('Data Base error', err));


const app = express();

app.use(express.json());

app.post('/auth/login', loginValidation, UserController.login);

app.post('/auth/register', registerValidation, UserController.register);

app.get('/auth/me', checkAuth, UserController.getMe);

// getting posts by unautorized users
app.get('/posts', PostController.getAll);
app.get('/posts/:id', PostController.getOne);
// getting posts for only autorized users
app.post('/posts', checkAuth, postCreateValidation, PostController.create);
app.delete('posts/:id', checkAuth, PostController.remove);
app.patch('/posts/:id', checkAuth, PostController.update);

app.listen(4444, (err) => {
    if (err) {
        return console.log(err);
    }
    console.log('Server OK');
});
