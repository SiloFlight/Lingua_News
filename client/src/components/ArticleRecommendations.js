import Container from "react-bootstrap/Container";

function GetArticleRecommendations({articleRecommendations}){
    //articleRecommendations are an array of articles
    //Each Article has a name and its link

    const ArticleRecomendations = articleRecommendations.map((articleRecommendation,index) =>{
        return (
            <p>
                <a href={articleRecommendation[1]}>{articleRecommendation[0]}</a>
            </p>
            )
    });

    return (<Container>
        {ArticleRecomendations}
    </Container>)
}

export default GetArticleRecommendations;