//Load env variables
import {config} from 'dotenv';
config();

import NLPCloudClient from 'nlpcloud';

import {getArticle} from "./Guardian_API.js";
var article = await getArticle("world/2024/dec/27/south-korean-lawmakers-impeach-acting-president-han-duck-soo");
var paragraphs = article.paragraphs;
for(var i = 0; i < paragraphs.length; i++){
    var paragraph = paragraphs[i];
    console.log(paragraph);
    for(var j = 0; j < paragraph.length;j++){
        //console.log(paragraph[j]);
    }
}

const NLPCloudKey = process.env.NLPC_API_KEY;

const client = new NLPCloudClient({model:'nllb-200-3-3b',token:NLPCloudKey});

// var c = true;
// for(var i = 0; i < paragraphs.length;i++){
//     var sentences = paragraphs[i].split('. ');

//     for(var j = 0; j < sentences.length; j++){
//         const sentence = sentences[j];
//         console.log(sentence);

//         // try{
//         //     const response = await client.translation({
//         //         text:sentence,
//         //         source:'eng_Latn',
//         //         target:'spa_Latn'
//         //     })
//         //     console.log(response.data);
//         // }catch(error){
//         //     console.error(error);
//         //     c=false;
//         //     break;
//         // }

//     }
// }