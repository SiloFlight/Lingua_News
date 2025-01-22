import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import './App.css';


//Pages
import Home from "./pages/Home";
import Article from "./pages/Article";
import PageNotFound from "./pages/PageNotFound"

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home/>}/>
        <Route path="/articles/:id" element={<Article/>}/>
        <Route path="*" element={<PageNotFound/>} />
      </Routes>
    </Router>
  )
}

export default App;
