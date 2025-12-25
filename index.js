import express from 'express';
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import fs from 'fs';


const app = express();
const port = 3000;
const __dirname = dirname(fileURLToPath(import.meta.url));
const dataFilePath = join(__dirname, 'posts.json');


app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.render('index.ejs', { posts: posts });
});

app.get('/about', (req, res) => {
    res.render('about.ejs');
});

app.get('/add_post', (req, res) => {
    res.render('add_post.ejs');
});

app.post('/submit', (req, res) => {
    const title = req.body.title;
    const subtitle = req.body.subtitle;
    const content = req.body.content;
    const category = req.body.category;
    const image = req.body.image;
    const id = posts.length + 1;
    const date = new Date().toISOString().split('T')[0];
    const newPost = { id: id, title: title, date: date, category: category, image: image, excerpt: subtitle, content: content };
    console.log(newPost);
    posts.push(newPost);
    fs.writeFile(dataFilePath, JSON.stringify(posts), "utf8", (err) => {
        if (err) {
            console.error('Error writing to file', err);
            return;
        }
    res.redirect('/');
    });
});

// To do: Implement delete post functionality
app.post('/delete/:id', (req, res) => {
    const postId = parseInt(req.params.id);
    
    // 過濾掉該 ID 的文章
    posts = posts.filter(post => post.id !== postId);

    // 寫入檔案
    fs.writeFile(dataFilePath, JSON.stringify(posts, null, 2), "utf8", (err) => {
        if (err) {
            console.error('Error writing to file', err);
            return res.status(500).send('刪除失敗'); // 如果寫入失敗，回傳錯誤，不要跳轉
        }
        
        // 🔥 關鍵修正：確保寫入成功後，才執行跳轉
        console.log(`文章 ID: ${postId} 已刪除`);
        res.redirect('/');
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});


var posts = [];
// Sample blog posts data
fs.readFile(dataFilePath, "utf8", (err, data) => {
  if (err) throw err;
    console.log(data);
    posts = JSON.parse(data);
});