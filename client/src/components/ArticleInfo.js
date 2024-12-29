import Container from "react-bootstrap/Container";

function getArticleInfo({Author,Date,OriginalLink}){
    return (<Container>
        <p>
            {Author}<br />{Date}<br/> <a href={OriginalLink}> Original Article</a>        
        </p>
    </Container>)
}

export default getArticleInfo;