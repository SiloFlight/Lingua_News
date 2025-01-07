//Load env variables
import {config} from 'dotenv';
config();

import { MongoClient } from 'mongodb';
const connectionString = process.env.DATABASE_URL;

const client = new MongoClient(connectionString);
//Research whether db should go up here or not

export async function InsertArticle(article){
    try{
        const db = client.db("MainDB");
        const collection = db.collection("Articles");

        const query = {origin : article.origin, originID : article.originID};

        //Validates that this article is not in the DB
        const documentCount = await collection.countDocuments(query);
        if(documentCount == 0){
            const result = await collection.insertOne(article);

            return true;
        }

        return false;
    }catch(e){
        console.error(e);

        return false;
    }
}

//To-Do: Figure out some way to instead filter the articles s.t. so that I can use insertMany instead of insertOne.
export async function InsertArticles(articles){
    var res = [];
    for(var i = 0; i < articles.length; i++){
        try{
            const article = articles[i];
            const result = await InsertArticle(article);
            res.push(result);
        }catch(e){
            console.log(e);
            res.push(false);
        }
    }

    return res;
}

export async function GetArticle(query={}){
    try{
        const db = client.db("MainDB");
        const collection = db.collection("Articles");

        const article = await collection.findOne(query);

        return article;
    }catch(e){
        console.error(e);
    }
}

export async function GetArticles(query={},max=10){
    try{
        const db = client.db("MainDB");
        const collection = db.collection("Articles");

        const articles = await collection.find(query).limit(max).toArray();

        return articles;
    }catch(e){
        console.error(e);
        return [];
    }
}

//Returns an article not translated into this language and doesn't have a translation in progress.
export async function GetUntranslatedArticle(languageCode){
    const query = {
        [`translatedTexts.${languageCode}`] : {$exists : false},
        translationInProgress : false
    };
    const untranslatedArticle = await GetArticle(query);

    return untranslatedArticle;
}

export async function UpdateTranslationStatus(id,translationStatus){
    try{
        const db = client.db("MainDB");
        const collection = db.collection("Articles");

        const query = {_id : id};
        const update = {
            $set: {
                translationInProgress : translationStatus
            },
        };

        const result = await collection.updateOne(query,update);

        if(result.matchedCount == 0){
            console.log(`Article ${id} does not exist.`);
            return false;
        }

        return true;
    }catch(e){
        console.error(e);
        return false;
    }
}

export async function UpdateTranslation(id,lang,translatedParagraph){
    try{
        const db = client.db("MainDB");
        const collection = db.collection("Articles");

        const query = {_id : id};
        const update = {
            $set: {
                [`translatedTexts.${lang}`] : translatedParagraph
            },
        };

        const result = await collection.updateOne(query,update);

        if(result.matchedCount == 0){
            console.log(`Article ${id} does not exist.`);
            return false;
        }

        return true;
    }catch(e){
        console.error(e);
        return false;
    }
}

export async function CloseDB(){
    await client.close();
}
