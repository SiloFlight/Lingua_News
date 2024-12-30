import Container from "react-bootstrap/Container";

function GetSuggestedArticles({suggestedArticles}){
    //articleRecommendations are an array of articles
    //Each Article has a name and its link

    const SuggestedArticles = suggestedArticles.map((suggestedArticle,index) =>{
        return (
            <p>
                <a href={suggestedArticle[1]}>{suggestedArticle[0]}</a>
            </p>
            )
    });

    return (<Container style={{width:"20%"}}>
        {SuggestedArticles}
    </Container>)
}

export default GetSuggestedArticles;