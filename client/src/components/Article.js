import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col"
import ArticleBody from "./ArticleBody";
import ArticleInfo from "./ArticleInfo";
import ArticleRecommendations from "./ArticleRecommendations";

function GetArticle({ArticleInf,ArticleReccs}){
    

    return (<Container fluid={true}>
        <Row>
            <Col>
                <ArticleInfo Author={ArticleInf["author"]} Date={ArticleInf["date"]} OriginalLink={ArticleInf["originalLink"]}></ArticleInfo>
            </Col>
            <Col>
                <ArticleBody translatedText={ArticleInf["translatedText"]} sourceText={ArticleInf["sourceText"]}></ArticleBody>
            </Col>
            <Col>
                <ArticleRecommendations articleRecommendations={ArticleReccs}></ArticleRecommendations>
            </Col>
        </Row>
    </Container>)
}

export default GetArticle;