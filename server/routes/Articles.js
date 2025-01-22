import express from "express";
import {GetTranslatedArticles,GetArticleByID} from '../db.js';

const Router = express.Router();

//Gets Translated Articles
Router.get("/",async (req,res) =>{
    //(To-Do): Strip out extra information from backend response. [originID,translationInProgress,]
    const id = req.query.id;
    const langCode = req.query.lang;
    const rand = req.query.rand;

    if(id){
        return res.json({
            articles : await GetArticleByID(id)
        });
    }

    if(langCode){
        return res.json({
            articles : await GetTranslatedArticles(langCode)
        });
    }

    res.json({
        articles : await GetTranslatedArticles()
    });
});

export default Router;