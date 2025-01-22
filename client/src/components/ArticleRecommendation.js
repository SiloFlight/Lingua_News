import { useState } from "react";
import {Container,Row} from 'react-bootstrap';

import {colors} from "../consts.js";

function GetArticleRecommendation({Article}){
    // eslint-disable-next-line
    const [article,setArticle] = useState(Article);

    const articleTitle = article.title;
    const sourceLang = article.sourceLang.toUpperCase();
    const translatedLangs = Object.keys(article.translatedTexts).map((code,index)=>code.toUpperCase());

    return (
        <Container className="text-center border rounded py-3 px-3" style={{backgroundColor:colors.c3}}>
            <Row className="border rounded" style={{backgroundColor:colors.c2}}>
                <a href={"/articles/"+article._id}>
                    {articleTitle}
                </a>
            </Row>
            <Row className="justify-content-center pt-3">
                {sourceLang} to {translatedLangs.join(",")}
            </Row>
        </Container>
    );

}

export default GetArticleRecommendation;