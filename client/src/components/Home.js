import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import ArticleRecommendation from "./ArticleRecommendation.js";

import {colors} from "../consts.js";

function GetHome({articles}){
    //The articleInfos have the article name, its source language, and what translated languages it has.
    const Articles = [];
    for(var i = 0; i < articles.length; i++){
        if(i % 3 === 2 || i === articles.length-1){
            const subArticles = articles.slice((i-i%3),i+1);
            //Make more readable
            Articles.push(<Row className="justify-content-center align-items-center py-3" xs={3}>{
                subArticles.map((subArticle,index)=>{
                return (<Col>
                    <ArticleRecommendation Article={subArticle}/>
                </Col>)
            })}</Row>);
        }
    }


    return (<Container>
        <Row>
        {/*<Row className="text-center py-2 fs-5">
            <Col className="border rounded" style={{background:colors.c4}}>Spanish</Col>
            <Col className="border rounded" style={{background:colors.c4}}>French</Col>
            <Col className="border rounded" style={{background:colors.c4}}>Italian</Col>
    </Row>*/}
        {Articles}
        </Row>
        
    </Container>)


}

export default GetHome;