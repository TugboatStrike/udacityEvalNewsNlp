function handleSubmit(event) {
    event.preventDefault()

    // check what text was put into the form field
    let formText = document.getElementById('name').value
    //console.log('formText: ', formText);
    Client.checkForName(formText)

    /*
    let objectSend = {};
    objectSend['text'] = formText;
    console.log('objectSend: ', objectSend);*/
    //let objectSend = createJson(formText);

    //console.log(getSentiment(formText));
    //console.log(getSentiment(objectSend));
    //console.log(getSentiment(createJson(formText)));
    getSentiment(createJson(formText))
      .then(anotherRes => {
        console.log('anotherRes: ', anotherRes);
        updateResults(anotherRes);
        return anotherRes;
      }).catch(e => console.log('errResult1', e))


    console.log("::: Form Submitted :::")
    fetch('http://localhost:8080/test')
    .then(res => res.json())
    .then(function(res) {
        console.log('skipping msg: ', res.message);
        //document.getElementById('results').innerHTML = res.message
    })
}

export { handleSubmit }


function createJson(text) {
    const objectJson = {
      data: text,
    };
    return objectJson
}


// data must be json format
async function getSentiment( data){
    //const url = ''
    console.log('the  data : ',  data );
    const response = await fetch('/sentiment', {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      credentials: 'same-origin',  // no-cors, *cors, same-origin
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    })
    const jsonResponse = await response.json();
    //console.log('json res from server: ', jsonResponse);
    return jsonResponse;
}


function updateResults(jsonData) {
  const sent = jsonData.agreement;
  const conf = jsonData.confidence;
  const tag = jsonData.score_tag;
  const resaultMsg = `Sentiment: ${sent}| Confidence: ${conf}| Score Tag: ${tag}`
  document.getElementById('results').innerHTML = resaultMsg;
}
