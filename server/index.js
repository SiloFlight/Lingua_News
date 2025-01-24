import express from 'express';
import cors from 'cors';
const app = express();

app.use(cors({
    origin:"https://lingua-news.onrender.com/"
}))

import Articles from './routes/Articles.js';
app.use('/Articles',Articles);

app.listen(3001,()=>{
    console.log("Running");
})