import Container from "react-bootstrap/Container";

function GetArticleInfo({Author,Date,OriginalLink}){
    return (<Container style={{width:"20%"}}>
        <p>
            {Author}<br />{Date}<br/> <a href={OriginalLink}> Original Article</a>        
        </p>
    </Container>)
}

export default GetArticleInfo;