//Load env variables
import axios from 'axios';
import {config} from 'dotenv';
config();

const singleItemAPIUrl = "https://content.guardianapis.com/";
const searchAPIUrl = "https://content.guardianapis.com/search";
const baseQueryStr = `?test=${process.env.GUARDIAN_API_KEY}&show-blocks=all&show-fields=all&show-tags=all&format=json`

const DaysInMonths = [31,28,31,30,31,30,31,31,30,31,30,31];

const sectionIDToCategoryMap = {

};

function formatArticle(article){
    return {
        id: article.id,
        origin : "Guardian",
        originUrl : article.webUrl,
        articleSourceText : article.blocks.body.bodyTextSummary,
        authors : article.tags.filter(tag => tag.type == "contributor").map(tag => tag.webTitle),
        publishingDate : article.webPublicationDate, //Needs some processing
        category : article.sectionId in sectionIDToCategoryMap ? sectionIDToCategoryMap[article.sectionId] : "misc",
        title : article.webTitle,
    };
}

//Get 10 most recent articles
async function Get10(){
    var APIURL = searchAPIUrl + baseQueryStr +"page-size=10";

    try{
        const response = await axios.get(APIURL);
        var results = response.data.response.results;

        return results.map((result,index) => formatArticle(result));
    }catch(e){
        console.error(e);
    }
}

//To-Do: Some way to track how many requests I've made.

/* 
I want a function that can search for articles after a certain date, in a certain section,lang, and a query text
*/

// const testQueryInfo = {
//     "earliestDate" : "2024-01-17",
//     //each sections elemet will be joined with an OR operator, inner will be joined with an AND
//     "sections" : [
//         ["technology"]
//     ],
//     "language" : "en",
//     "queryText" : "Chip"
// }

// function validateDate(dateString){
//     const date = dateString.split(",");
// }

// function f1(queryInfo){
//     function validateQueryInfo(queryInfo){
//         //Validate query Info

//         //Validate Date

//         //Validate sections

//         //Validate language
        
//         //Update query text with escape characters and replace spaces
//     }
// }

// /* 
// There should also be a function that can request a specific article from the guardian
// */

// function f2(websiteName){

// }