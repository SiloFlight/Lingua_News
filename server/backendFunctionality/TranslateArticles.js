import { GetUntranslatedArticles, UpdateTranslationStatus,UpdateTranslation,CloseDB } from "../db.js";
import { translateParagraphs } from "../Translation.js";

const targetLang = "fr";

async function TranslateArticles(){
    const untranslatedArticles = await GetUntranslatedArticles(targetLang);

    for(var i = 0; i < untranslatedArticles.length; i++){
        const untranslatedArticle = untranslatedArticles[i];

        await UpdateTranslationStatus(untranslatedArticle._id,true);
        const translationResult = await translateParagraphs(untranslatedArticle.articleSourceText,untranslatedArticle.sourceLang,targetLang);

        await UpdateTranslation(untranslatedArticle._id,targetLang,translationResult);
        await UpdateTranslationStatus(untranslatedArticle._id,false);

        console.log(i);
    }
}

await TranslateArticles();
CloseDB();