import { TranslationServiceClient } from '@google-cloud/translate';

// Instantiates a client
const translationClient = new TranslationServiceClient();

const projectId = 'winterimproject';
const location = 'global';
const text = 'Hello, world!';

const validLanguagesCodes = ['en','es','fr'];

export async function translateSentence(sentence,sourceLang,targetLang){
    //API request safety l8r
    try{
        const req = {
            parent: `projects/${projectId}/locations/${location}`,
            contents: [sentence],
            mimeType: 'text/plain', // mime types: text/plain, text/html
            sourceLanguageCode: sourceLang,
            targetLanguageCode: targetLang,
        };
    
        const [response] = await translationClient.translateText(req);

        return response.translations[0].translatedText;
    }catch(e){
        console.error(e);
        return "";
    }
}


export async function translateParagraph(paragraph,sourceLang,targetLang,MAXATTEMPTS=1) {
    var results = [];
    for(var i = 0; i < paragraph.length; i++){
        const sentence = paragraph[i];
        for(var j = 0; j < MAXATTEMPTS; i++){
            const res = await translateSentence(sentence,sourceLang,targetLang);
            console.log(res);

            if(res == "" && sentence !=""){
                continue;
            }
            results.push(res);
            break;
        }
        if(results.length == i){
            results.push("");
        }
    }

    return results;
}

export async function translateParagraphs(paragraphs,sourceLang,targetLang,MAXATTEMPTS=1){
    var results = [];
    for(var i = 0; i < paragraphs.length; i++){
        const res = await translateParagraph(paragraphs[i],sourceLang,targetLang,MAXATTEMPTS)
        results.push(res);
    }
    return results;
}


//To-Do: Something that actuall formats it properly.