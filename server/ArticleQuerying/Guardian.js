//Load env variables
import axios from 'axios';
import {config} from 'dotenv';
config();

const singleItemAPIUrl = "https://content.guardianapis.com/";
const searchAPIUrl = "https://content.guardianapis.com/search";
const baseQueryStr = `?test=${process.env.GUARDIAN_API_KEY}&show-blocks=all&show-fields=all&show-tags=all&format=json`

const DaysInMonths = [31,28,31,30,31,30,31,31,30,31,30,31];

//Maps Guardian API sections to my sections in my database
const sectionIDToCategoryMap = {
    "about" : "misc",
    "animals-farmed" : "misc",
    "artanddesign" : "art",
    "australia-news" : "world",
    "better-business" : "business",
    "books" : "literature",
    "business" : "business",
    "business-to-business" : "business",
    "cardiff" : "world",
    "childrens-books-site" : "literature",
    "cities" : "culture",
    "commentisfree" : "misc",
    "community" : "misc",
    "crosswords" : "misc",
    "culture" : "culture",
    "culture-network" : "culture",
    "culture-professionals-network" : "culture",
    "edinburgh" : "world",
    "education" : "education",
    "enterprise-network" : "misc",
    "environment" : "environment",
    "extra" : "misc",
    "fashion" : "lifestyle",
    "film" : "film",
    "food" : "food",
    "football" : "sports",
    "games" : "videoGames",
    "global-development" : "world",
    "global-development-professionals-network" : "world",
    "government-computing-network" : "misc",
    "guardian-foundation" : "misc",
    "guardian-professional" : "misc",
    "healthcare-network" : "misc",
    "help" : "misc",
    "higher-education-network" : "education",
    "housing-network" : "world",
    "inequality" : "society",
    "info" : "misc",
    "jobsadvice" : "misc",
    "katine" : "world",
    "law" : "politics",
    "leeds" : "world",
    "lifeandstyle" : "lifestyle",
    "local" : "world",
    "local-government-network" : "world",
    "media" : "media",
    "media-network" : "misc",
    "membership" : "misc",
    "money" : "society",
    "music" : "music",
    "news" : "world",
    "politics" : "politics",
    "public-leaders-network" : "misc",
    "science" : "science",
    "search" : "misc",
    "small-business-network" : "business",
    "social-care-network" : "health",
    "social-enterprise-network" : "misc",
    "society" : "society",
    "society-professionals" : "society",
    "sport" : "sport",
    "stage" : "art",
    "teacher-network" : "education",
    "technology" : "technology",
    "thefilter" : "misc",
    "theguardian" : "misc",
    "theobserver" : "misc",
    "travel" : "lifestyle",
    "travel/offers" : "misc",
    "tv-and-radio" : "media",
    "uk-news" : "world",
    "us-news" : "world",
    "us-wellnes" : "misc",
    "voluntary-sector-network" : "misc",
    "weather" : "environment",
    "wellness" : "lifestyle",
    "women-in-leadership" : "misc",
    "working-in-development" : "misc",
    "world" : "world"
};

function formatArticle(article){
    return {
        origin_id: article.id,
        origin : "Guardian",
        originUrl : article.webUrl,
        articleSourceText : article.blocks.body.bodyTextSummary.split("\n").filter(para != ""),
        translatedTexts : {},
        translationInProgress : false,
        sourceLang : article.fields.lang,
        authors : article.tags.filter(tag => tag.type == "contributor").map(tag => tag.webTitle),
        publishingDate : article.webPublicationDate, //ISO 8601
        category : article.sectionId in sectionIDToCategoryMap ? sectionIDToCategoryMap[article.sectionId] : "misc",
        title : article.webTitle,
    };
}

//Get 10 most recent articles
export async function Get10(){
    var APIURL = searchAPIUrl + baseQueryStr +"page-size=10";

    try{
        const response = await axios.get(APIURL);
        var results = response.data.response.results;

        return results.map((result,index) => formatArticle(result));
    }catch(e){
        console.error(e);
        return [];
    }
}