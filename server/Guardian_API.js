//Load env variables
import {config} from 'dotenv';
config();

import axios from 'axios';


const guardianAPIKey = process.env.GUARDIAN_API_KEY;

function processParagraph(){
    //Converts a paragraph into an array of sentences.
}


function parseArticleContent(content){
    function parseBodyHTML(bodyHTML){
        function validateParagraph(paragraph){
            function validateSentence(sentence){
                return sentence.length > 0;
            }


            for(var i = 0; i < paragraph.length;i++){
                var sentence = paragraph[i];

                if(validateSentence(sentence) == false){
                    paragraph.splice(i,1);
                    i--;
                }
            }

            return paragraph.length != 0;
        }

        var paragraphs = bodyHTML.split("\n");
        for(var i = 0; i < paragraphs.length; i++){
            paragraphs[i] = paragraphs[i].split(".");

        }

        for(var i = 0; i < paragraphs.length; i++){
            var paragraph = paragraphs[i];
            if(validateParagraph(paragraph) == false){
                paragraphs.splice(i,1);
                i--;
            }
        }

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


export async function getArticle(articleID){
   var apiURL = "https://content.guardianapis.com/" + articleID + "?show-blocks=all&show-references=author&format=json&api-key="+"test";

   try{
    const response = await axios.get(apiURL);
    return parseArticleContent(response.data.response.content);
   }catch(error){
    console.error(error);
   }

}


