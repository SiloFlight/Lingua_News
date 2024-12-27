//Load env variables
import {config} from 'dotenv';
config();

import axios from 'axios';


const guardianAPIKey = process.env.GUARDIAN_API_KEY;


function parseArticleContent(content){
    function parseBodyHTML(bodyHTML){
        function isValidParagraph(paragraphStr){
            return paragraphStr.length > 0;
        }

        var paragraphs = bodyHTML.split("\n");

        return paragraphs
    }

    //Eventually I should store author info

    return {
        "id" : content["id"],
        "sectionID" : content["sectionId"],
        "webPublicationDate" : content["webPublicationDate"],
        "webTitle" : content["webTitle"],
        "url" : content["webUrl"],
        "paragraphs" : parseBodyHTML(content["blocks"]["body"][0]["bodyTextSummary"])

    };
}


async function getArticle(articleID){
   var apiURL = "https://content.guardianapis.com/" + articleID + "?show-blocks=all&show-references=author&format=json&api-key="+"test";
   console.log(apiURL)


   axios.get(apiURL).then((response) => {
    console.log(parseArticleContent(response.data.response.content));
   },(error) =>{
    console.log(error);
   });

}


getArticle("world/2024/dec/27/south-korean-lawmakers-impeach-acting-president-han-duck-soo")


