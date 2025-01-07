import nlp from 'compromise';

//Given a block of text as a paragraph, this splits it into an array of textual sentences.
export function decomposeParagraph(paragraph){
    const doc = nlp(paragraph);

    return doc.document.map((sentence,index) =>{
        var str = "";
        for(var i = 0; i < sentence.length; i++){
            const word = sentence[i];
            str += word.pre + word.text + word.post + " ";
        }

        //Remove empty space at the end of sentence.
        if(str.length > 0){
            str = str.substring(0,str.length-1);
        }

        return str;
    });
}