"use strict";
// import express, { Request, Response } from 'express';
// import path from 'path';
// import dotenv from 'dotenv';
// import fs from 'fs';
// import cors from 'cors';
// import hbs from 'express-hbs';
// import { User } from './types/User';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// dotenv.config();
// const app = express();
// const PORT = process.env.PORT || 3001;
// app.use(cors());
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.engine('hbs', hbs.express4({
//     partialsDir: path.join(__dirname, 'views/partials'),
//     defaultLayout: path.join(__dirname, 'views/layout.hbs')
// }));
// app.set('view engine', 'hbs');
// app.set('views', path.join(__dirname, 'views'));
// let currentTimeout: NodeJS.Timeout | null = null;
// app.get('/', (req: Request, res: Response) => {
//     res.render('index');
// });
// app.post('/search', (req: Request, res: Response) => {
//     if (currentTimeout) {
//         clearTimeout(currentTimeout);
//     }
//     const { email, number } = req.body;
//     if (!email) {
//         return res.status(400).json({ error: 'Email is required' });
//     }
//     currentTimeout = setTimeout(() => {
//         fs.readFile(path.join(__dirname, 'users.json'), 'utf8', (err, data) => {
//             if (err) {
//                 return res.status(500).json({ error: 'Server' });
//             }
//             const users: User[] = JSON.parse(data);
//             const filteredUsers = users.filter((user: User) => {
//                 return user.email === email && (!number || user.number === number);
//             });
//             res.json(filteredUsers);
//         });
//     }, 5000); // 5 seconds delay
// });
// app.listen(PORT, () => {
//     console.log('open localhost:' + PORT);
// });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const express_hbs_1 = __importDefault(require("express-hbs"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// Static files middleware
app.use(express_1.default.static(path_1.default.join(__dirname)));
// View engine setup
app.engine('hbs', express_hbs_1.default.express4({
    partialsDir: path_1.default.join(__dirname, 'views', 'partials'),
    defaultLayout: path_1.default.join(__dirname, 'views', 'layout.hbs')
}));
app.set('view engine', 'hbs');
app.set('views', path_1.default.join(__dirname, 'views'));
app.get('/', (req, res) => {
    res.render('index');
});
app.post('/search', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, number } = req.body;
    // Simulating a delay for the response
    yield new Promise(resolve => setTimeout(resolve, 5000));
    // Reading and filtering users from users.json
    const usersData = fs_1.default.readFileSync(path_1.default.join(__dirname, 'users.json'), 'utf-8');
    const users = JSON.parse(usersData);
    const filteredUsers = users.filter((user) => {
        if (number) {
            return user.email === email && user.number === number;
        }
        return user.email === email;
    });
    res.json(filteredUsers);
}));
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
