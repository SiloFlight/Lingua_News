//Load env variables
import {config} from 'dotenv';
config();

import NLPCloudClient from 'nlpcloud';

const NLPCloudKey = process.env.NLPC_API_KEY;

languageCodeMap = {
    "es" : "spa_Latn",
    "en" : "eng_Latn",
    "fr" : "fra_Latn"
}

const client = new NLPCloudClient({model:'nllb-200-3-3b',token:NLPCloudKey});

//Translate Single Sentence
/* Response Codes
0 : Translation succeeded.
1 : Invalid source or target language. 
2 : Error on response
*/
export async function translateSentence(sentence,sourceLang,targetLang){
    if(!(sourceLang in languageCodeMap && targetLang in languageCodeMap)){
        return {
            responseCode : 1,
            translatedText : ""
        };
    }

    if(sentence == ""){
        //Don't waste API Call;
        return "";
    }

    try{
        const response = await client.translation({
            text : sentence,
            source: languageCodeMap[sourceLang],
            target: languageCodeMap[targetLang]
        });

        return {
            responseCode : 0,
            translatedText : response.data.translation_text
        };
    }catch(error){
        console.error(error.response.status);
        console.error(error.response.data.detail);
        return {
            responseCode : 2,
            translatedText : ""
        };
    }

}

//Translate Array of Sentences (Paragraph)
//MAXATTEMPTS should be greater than 1 because otherwise, you will skip the first element with an error due to API limits
export async function translateParagraph(paragraph,sourceLang,targetLang,MAXATTEMPTS=2){
    //Max attempt safety so that result is not null.
    if(MAXATTEMPTS < 1){
        MAXATTEMPTS = 1;
    }
    var translatedParagraph = [];

    for(var i = 0; i < paragraph.length; i++){
        const sentence = paragraph[i];
        var attempts = 0;
        var result;

        while(attempts < MAXATTEMPTS){
            result = await translateSentence(sentence,sourceLang,targetLang);
            attempts += 1;

            if(result.responseCode == 2){
                await new Promise(r => setTimeout(r, 60*1000));
            }else{
                break;
            }
        }

        translatedParagraph.push(result);
    }

    return translatedParagraph;
}

//Translate Array of Paragraphs
export async function translateParagraphs(paragraphs,sourceLang,targetLang,MAXATTEMPTS=2){
    var translatedParagraphs = [];
    for(var i = 0; i < paragraphs.length;i++){
        const paragraph = paragraphs[i];

        var result = await translateParagraph(paragraph,sourceLang,targetLang,MAXATTEMPTS);

        translatedParagraphs.push(result);
    }

    return translatedParagraphs;
}