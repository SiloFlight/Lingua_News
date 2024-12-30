import Container from "react-bootstrap/Container";

function GetArticleBody({translatedText,sourceText}){
    //articleText is an array of paragraphs. Each paragraph is an array of sentences.
    //sourceText is an accompanying array of paragraphs. The respective index in articleText corresponds to the respective source text.

    //On Hover on a sentence in the article, it should display a text box with the source text.

    const ArticleBody = translatedText.map((paragraph,index)=>{
        var paraText = "";

        for(var i = 0; i < paragraph.length; i++){
            paraText += paragraph[i];
        }

        return (<p>
            {paraText}
        </p>)
    })

    return (
    <Container style={{width:"60%"}}>
        {ArticleBody}
    </Container>)
}

export default GetArticleBody;