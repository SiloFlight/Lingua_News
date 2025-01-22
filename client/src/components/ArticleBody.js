import { useState } from "react";
import Container from "react-bootstrap/Container";

function GetArticleBody({Article}){
    var [targetLang,setTargetLang] = useState();
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    if(Article === null){return <></>}
    if(targetLang === undefined){
        targetLang = Object.keys(Article.translatedTexts)[0];
    }

    const sourceText = Article.articleSourceText;

    const translatedText = Article.translatedTexts[targetLang];

    //Very base on GPT
    const ArticleBody = translatedText.map((paragraph, index) => {
        return (
            <p key={index} style={{textIndent:"40px"}}>
                {paragraph.map((sentence, sentenceIndex) => {
                    return (
                        <span
                            key={sentenceIndex}
                            style={{ position: "relative", cursor: "pointer" }}
                            onMouseEnter={(e) => {
                                const sourceSentence = document.createElement("div");
                                sourceSentence.className = "fs-6 p-2 border rounded text-center";
                                
                                sourceSentence.style.backgroundColor = "#333333";
                                sourceSentence.style.color = "#ffffff";
                                sourceSentence.textContent = sourceText[index][sentenceIndex];
                                sourceSentence.style.position = "absolute";
                                sourceSentence.style.bottom = "-200%";
                                sourceSentence.style.whiteSpace = "normal"; // Allow text to wrap
                                sourceSentence.style.width = "400px"; // Set a max width
                                sourceSentence.style.zIndex = "1";
    
                                e.target.appendChild(sourceSentence);
                                requestAnimationFrame(() => {
                                    sourceSentence.style.opacity = "1";
                                });
    
                                // Store reference to tooltip for later removal
                                e.target.sourceSentence = sourceSentence;
                            }}
                            onMouseLeave={(e) => {
                                const sourceSentence = e.target.sourceSentence;
                                if (sourceSentence) {
                                    sourceSentence.style.opacity = "0";
                                    sourceSentence.addEventListener(
                                        "transitionend",
                                        () => {
                                            if (sourceSentence.parentNode) {
                                                sourceSentence.parentNode.removeChild(sourceSentence);
                                            }
                                        },
                                        { once: true } // Ensures the listener is only triggered once
                                    );
                                    // Remove reference to avoid memory leaks
                                    delete e.target.sourceSentence;
                                }
                            }}
                        >
                            {sentence+" "}
                        </span>
                    );
                })}
            </p>
        );
    });

    //Also from GPT
    const button = (
        <div style={{ position: "relative", display: "inline-block", zIndex:10}}>
            <button
                onClick={() => setDropdownOpen((prev) => !prev)}
                style={{
                    padding: "8px 12px",
                    borderRadius: "5px",
                    backgroundColor: "#007bff",
                    color: "white",
                    border: "none",
                    cursor: "pointer",
                }}
            >
                {targetLang || "Select Language"}
            </button>
            {isDropdownOpen && (
                <ul
                    style={{
                        position: "absolute",
                        top: "100%",
                        left: 0,
                        margin: 0,
                        padding: "8px 0",
                        listStyle: "none",
                        backgroundColor: "white",
                        border: "1px solid #ddd",
                        borderRadius: "5px",
                        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                    }}
                >
                    {Object.keys(Article.translatedTexts).map((lang) => (
                        <li
                            key={lang}
                            onClick={() => {
                                setTargetLang(lang);
                                setDropdownOpen(false);
                            }}
                            style={{
                                padding: "8px 12px",
                                cursor: "pointer",
                                backgroundColor:
                                    lang === targetLang ? "#f0f0f0" : "white",
                                color: lang === targetLang ? "#007bff" : "black",
                            }}
                        >
                            {lang}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );

    return (
    <Container className="fs-5">
        <div className="py-3">
            {button}
        </div>
        {ArticleBody}
    </Container>)
}

export default GetArticleBody;