function handleSubmit(event) {
    event.preventDefault()

    // check what text was put into the form field
    let formText = document.getElementById('name').value
    console.log('formText: ', formText);
    Client.checkForName(formText)

    /*
    let objectSend = {};
    objectSend['text'] = formText;
    console.log('objectSend: ', objectSend);*/
    let objectSend = createJson(formText);

    //console.log(getSentiment(formText));
    //console.log(getSentiment(objectSend));
    console.log(getSentiment(createJson(formText)));


    console.log("::: Form Submitted :::")
    fetch('http://localhost:8080/test')
    .then(res => res.json())
    .then(function(res) {
        document.getElementById('results').innerHTML = res.message
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
    //const response = await fetch('http://localhost:8080/sentiment', {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      credentials: 'same-origin',  // no-cors, *cors, same-origin
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    })
    const jsonResponse = await response.json();
    console.log('json res from server: ', jsonResponse);
    //console.log('res from server: ', response);
    //console.log('res from server: ', response.value);
    //console.log('client res: ',response.body);
}
