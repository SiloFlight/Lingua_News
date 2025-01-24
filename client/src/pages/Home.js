import { useState, useEffect } from "react";
import { backendURL } from "../consts";

import HomeComponent from "../components/Home";
import Navbar from "../components/Navbar.js";

function Home(){
    //Request Articles from the backend
    //Will eventually make a call to the backend
    const APIURl = `${backendURL}Articles`;

    const [ArticleData,setArticleData] = useState([]);

    useEffect(()=>{
        fetch(APIURl).then(response=>response.json()).then(json=>{setArticleData(json.articles);console.log(json)}).catch(e=>console.error(e));
    },[APIURl]);

    return (<div>
        <Navbar/>
        <HomeComponent articles={ArticleData}/>
    </div>)
}

export default Home;