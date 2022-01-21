var form = document.querySelector("form");
var content = document.querySelector(".content")
var search_element = document.querySelector("#search")

// after you submitted the form below function will happen

form.addEventListener("submit",(e)=>{
    e.preventDefault();
    content.replaceChildren();
var search_element = document.querySelector("#search").value;
if (search_element === "") {
  alert("enter any word")
} 
if(search_element)
fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${search_element}`)
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        const wrapper_origin = document.createElement("div");
        wrapper_origin.setAttribute("id","wrapper_origin")


            const h4= document.createElement("h4");
            const span = document.createElement("span");
    
           const wrap= document.createElement("div");

            wrap.setAttribute("id","wrap")
            span.setAttribute("class","sm2");

              h4.innerText ="Origin : "
              span.innerText = (data[0].origin)?data[0].origin:"not avaliable";
              h4.appendChild(span);
              wrap.append(h4);
              wrapper_origin.append(wrap);

            if(data[0].meanings[0].definitions[0].synonyms){// if sysnonyms is there do the function
             
                const wrap= document.createElement("div");
                const h5= document.createElement("h4");
                const span = document.createElement("span");
                
                
            wrap.setAttribute("id","wrap")
            span.setAttribute("class","sm1");
            h5.innerText ="Synonyms : "
            // below -checks whether the synonyms has a data if data is there dispaly the data orelse display "not avaliable"
            span.innerText =(data[0].meanings[0].definitions[0].synonyms).length>0? data[0].meanings[0].definitions[0].synonyms :"not avaliable" ;
                 
    
                  h5.appendChild(span);
                  wrap.append(h5);
                  wrapper_origin.append(wrap);
                }


                if(data[0].meanings[0].definitions[0].antonyms){
                    const wrap= document.createElement("div");
                    const h5= document.createElement("h4");
                const span = document.createElement("span");

                
                    wrap.setAttribute("id","wrap")
                    span.setAttribute("class","sm1");

                    span.innerText =(data[0].meanings[0].definitions[0].antonyms).length>0? data[0].meanings[0].definitions[0].antonyms:"not avaliable" ;;
                    h5.innerText ="Antonyms : "
                    h5.appendChild(span);
                    wrap.append(h5);
                    wrapper_origin.append(wrap);
                  
                  }

                content.append(wrapper_origin);
                
                if(data[0].phonetics[0].audio){ // for the audio element 
                  const wrapper = document.createElement("div");
                  wrapper.setAttribute("id","wrapper_sound")
                  const sound      = document.createElement('audio');
                  sound.id       = 'audio-player';
                  sound.controls = 'controls';
                  sound.src      = `https://${data[0].phonetics[0].audio}`;
                  sound.type     = 'audio/mpeg';
                  wrapper.appendChild(sound)
                  content.append(wrapper);
                  }
                
                  
           
data[0].meanings[0].definitions.forEach(ele => { 
    const wrapper = document.createElement("div");
    const h2 = document.createElement("h2");
    const h3= document.createElement("h3");
    const span = document.createElement("span");
    const span1 = document.createElement("span");
    
  wrapper.setAttribute("id","wrapper")
  span.setAttribute("class","sm");
  span1.setAttribute("class","sm");


  if(ele.definition){
    span.innerText = ele.definition;
    h2.innerText="Definitions : "
  }

  if(ele.example){
    span1.innerText = ele.example;
    h3.innerText ="Example : "
  }

  h2.appendChild(span);
  h3.appendChild(span1);
wrapper.append(h2);
wrapper.append(h3);
content.append(wrapper);
})

})
    .catch(function(error) {
      console.log(error);
    content.replaceChildren();
      const error_div = document.createElement("div");
      error_div.setAttribute("id","error_div")
    const h3= document.createElement("h3");
    h3.innerHTML =`<span style="color:red;">Sorry ! </span>Data not found!`;
      const img = document.createElement("img");
      img.src="./images/data.svg"
      error_div.append(img)
      error_div.append(h3)
      content.append(error_div);
    });
   
})

