import express from 'express';
import ejs from 'ejs';
import bodyParser from 'body-parser';   


const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.render('index.ejs');
});

app.get('/about', (req, res) => {
    res.render('about.ejs');
});

app.post('/add_post', (req, res) => {
    res.render('add_post.ejs');
});


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
