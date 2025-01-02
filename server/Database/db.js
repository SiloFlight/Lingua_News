//Load env variables
import {config} from 'dotenv';
config();

const { MongoClient } = require("mongodb");
const connectionString = process.env.DATABASE_URL;

const client = new MongoClient(connectionString);
//Research whether db should go up here or not

export async function InsertArticle(article){
    try{
        const db = client.db("MainDB");
        const collection = db.collection("Articles");

        const query = {origin : article.origin, originID : article.originID};

        //Validates that this article is not in the DB
        if(collection.countDocuments(query) === 0){
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
    try{
        return articles.map(async (article,index) => await InsertArticle(article));
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

async function CloseDB(){
    await client.close();
}
