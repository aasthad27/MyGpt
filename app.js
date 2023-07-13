const API_KEY ="YOUR_API_KEY"
const submitButton=document.querySelector('#submit')
const result=document.querySelector('#output')
const inputElem=document.querySelector('input')
const histElem=document.querySelector('.history')
const buttonelem=document.querySelector('button')
function changeInput(value)
{
   const inputElement= document.querySelector('input')
   inputElement.value=value
}
async function getMessage(){
    console.log('clicked')
    const options={
        method: 'POST',
        headers:{
            'Authorization': `Bearer ${API_KEY}`,
             'Content-Type':'application/json'
        },

        body:JSON.stringify({
            model:"gpt-3.5-turbo",
            messages:[
                {
                    role:"user",
                    content:inputElem.value
                }],
            max_tokens:100  
        })
    }
    try{
       const response= await fetch('https://api.openai.com/v1/chat/completions',options)
        const data= await response.json()
        console.log(data);
        result.textContent=data.choices[0].message.content
      if(data.choices[0].message.content && inputElem.value)
      {
        const elem=document.createElement('p')
        elem.textContent=inputElem.value
        elem.addEventListener('click',()=>changeInput(elem.textContent))
        histElem.append(elem)
      }
    }
    catch(error){
      console.log(error)
    }
   
        
}
function clearInput(){
    inputElem.value=''
}
submitButton.addEventListener('click',getMessage)
buttonelem.addEventListener('click',clearInput)
