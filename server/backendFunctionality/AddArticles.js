import { GetArticles } from "../ArticleQuerying/Guardian.js";
import { InsertArticles, CloseDB } from "../db.js";

const articles = await GetArticles();

await InsertArticles(articles);

await CloseDB();
