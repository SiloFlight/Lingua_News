import { useState,useEffect } from "react";
import { useParams } from "react-router-dom";

import Container from "react-bootstrap/Container";

import Navbar from "../components/Navbar.js";
import ArticleHeader from "../components/ArticleHeader.js";
import ArticleBody from "../components/ArticleBody.js";

import PageNotFound from "./PageNotFound.js";

import { backendURL } from "../consts";

function Article(){
    //Request Articles from the backend
    //Will eventually make a call to the backend
    const {id} = useParams();
    const APIURl = `${backendURL}Articles?id=${id}`;

    const [articleInfo,setArticleInfo] = useState();

    useEffect(()=>{
        fetch(APIURl).then(response=>response.json()).then(json=>{setArticleInfo(json.articles);console.log(json)}).catch(e=>console.error(e));
    },[APIURl]);


    return articleInfo === undefined || articleInfo.length === 0 ? (PageNotFound()) :(<div>
        <Navbar/>
        <Container style={{width:"80%"}}>
            <ArticleHeader Article={articleInfo[0]}/>
            <ArticleBody Article={articleInfo[0]}/>
        </Container>
        
    </div>)
}

export default Article;