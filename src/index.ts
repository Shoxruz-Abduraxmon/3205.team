
import express from 'express';
import cors from 'cors';
import hbs from 'express-hbs';
import fs from 'fs';
import path from 'path';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname)));

app.engine('hbs', hbs.express4({
    partialsDir: path.join(__dirname, 'views', 'partials'),
    defaultLayout: path.join(__dirname, 'views', 'layout.hbs')
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
    res.render('index');
});

app.post('/search', async (req, res) => {
    const { email, number } = req.body;

    await new Promise(resolve => setTimeout(resolve, 5000));

    const usersData = fs.readFileSync(path.join(__dirname, 'users.json'), 'utf-8');
    const users = JSON.parse(usersData);

    const filteredUsers = users.filter((user: { email: string, number: string }) => {
        if (number) {
            return user.email === email && user.number === number;
        }
        return user.email === email;
    });

    res.json(filteredUsers);
});

app.listen(PORT, () => {
    console.log(`open localhost:${PORT}`);
});

