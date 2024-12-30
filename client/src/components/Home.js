import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";


function GetHome({articles}){
    //articles is an array of articleInfos
    //The articleInfos have the article name, its source language, and what translated languages it has.

    const Articles = []

    for(var i = 0; i < articles.length; i++){
        if(i % 3 == 2 || i == articles.length-1){
            const subArticles = articles.slice((i-i%3),i+1);
            //Make more readable
            Articles.push(<Row>{
                subArticles.map((subArticle,index)=>{
                return (<Col>{subArticle[0]}</Col>)
            })}</Row>);
        }
    }


    return (<Container>
        {Articles}
    </Container>)


}

export default GetHome;