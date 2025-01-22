import { Row } from "react-bootstrap";

function GetArticleHeader({Article}){
    return Article === undefined ? (<></>): (
        <div className="text-center py-3">
            <Row className="fs-4">{Article.title}</Row>
            <Row className="fs-5 ps-5">By: {Article.authors.join(",")}</Row>
        </div>
    )
}

export default GetArticleHeader;