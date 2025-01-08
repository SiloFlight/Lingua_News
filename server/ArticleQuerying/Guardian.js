//Load env variables
import axios from 'axios';
import {config} from 'dotenv';
import {JSDOM} from 'jsdom';

import {decomposeParagraph} from '../paragraphProcessing.js'

const dom = new JSDOM(`<!DOCTYPE html>`);
const document = dom.window.document;
const Node = dom.window.Node;
config();

const singleItemAPIUrl = "https://content.guardianapis.com/";
const searchAPIUrl = "https://content.guardianapis.com/search";
const baseQueryStr = `?api-key=${process.env.GUARDIAN_API_KEY}&show-blocks=all&show-fields=all&show-tags=all&format=json&type=article`;

//BlackList (To-Do): Crossword

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

function extractTextWithLineBreaks(html) {
    const tempElement = document.createElement("div");
    tempElement.innerHTML = html;

    let text = "";
    tempElement.childNodes.forEach(node => {
        if (node.nodeType === Node.ELEMENT_NODE) {
            // Add line break after block-level elements
            if (["P", "DIV", "BR"].includes(node.nodeName)) {
                text += (node.textContent || "").trim() + "\n";
            } else {
                text += (node.textContent || "").trim();
            }
        } else if (node.nodeType === Node.TEXT_NODE) {
            text += node.textContent;
        }
    });

    return text.trim();
}

function formatArticle(article){    
    return {
        originID: article.id,
        origin : "Guardian",
        originUrl : article.webUrl,
        articleSourceText : extractTextWithLineBreaks(article.fields.body).split("\n").filter(para => para != "").map(para => para.trim()).map(decomposeParagraph),
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
export async function GetArticles(){
    var APIURL = searchAPIUrl + baseQueryStr +"&page-size=10";

    var processedArticles = [];

    try{
        const response = await axios.get(APIURL);
        var results = response.data.response.results;

        for(var i = 0; i < results.length; i++){
            processedArticles.push(formatArticle(results[i]));
        }

        return processedArticles;
    }catch(e){
        console.error(e);
        return [];
    }
}