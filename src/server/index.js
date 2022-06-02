var path = require('path')
const express = require('express')
const mockAPIResponse = require('./mockAPI.js')
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cors = require('cors');

//const FormData = require('form-data'); // required for meaning cloud js call
const fetch = require('node-fetch'); // required for fetch


dotenv.config(); // allowing the .env file to be called by dotenv module.


const app = express()

/**** Middleware ****/

// !!!!This needs better explination on usage!!!!!!
// Here we are configuring express to use body-parser as middle-ware.
//app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
//app.use(cors());


app.use(express.static('dist'))

console.log(__dirname)

app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
    // res.sendFile(path.resolve('src/client/views/index.html'))
})

// designates what port the app will listen to for incoming requests
app.listen(8080, function () {
    console.log('Example app listening on port 8080!')
})

app.get('/test', function (req, res) {
    res.send(mockAPIResponse)
})

// meaning cloud api call details
mc = {
  https: 'https://',
  hostname:  "api.meaningcloud.com",
  key: process.env.MEANING_CLOUD_API_KEY,
  lang: "en",
  types: {
    sent: '/sentiment-2.1?key=',
  },
  fetchOp: {
    method: 'POST',
    redirect: 'follow'
  },
  /*
  url: function() {
    return String.raw`${ht}${hn}${type}${key}&lang=${lg}&txt=${tx}&model=${mod}`
  }*/
};

// create url for meaning cloud api url fetch call
function mcUrl(text, mcType) {
  const tx = encodeURIComponent(text);
  const ht = mc.https;
  const hn = mc.hostname;
  const key = mc.key;
  const lg = mc.lang;
  const type = mcType;
  const mod = 'test';
  const url = String.raw`${ht}${hn}${type}${key}&lang=${lg}&txt=${tx}`;
  //const url = String.raw`${ht}${hn}${type}${key}&lang=${lg}&txt=${tx}&model=${mod}`;
  return url;
};

// meaning cloud sentiment api fetch
async function sentFetch(text) {
  const response = await fetch(mcUrl(text, mc.types.sent),mc.fetchOp)
  const jsonInfo = await response.json();
  console.log('jsonInfo: ', jsonInfo);
  //console.log('sentFetch response: ', response);
  //return response;
  return jsonInfo;
};

sentFetch(`test text`);

/*
app.get('/test', function (req, res) {
    res.send(mockAPIResponse)
})*/

app.post('/sentiment', function(request, response) {
    const dataText = request.body.data;
    //const reqJson = response.json();
    console.log('start sentiment');
    console.log('body: ', request.body);
    console.log('data: ', request.body.data);
    sentFetch(dataText)
      //.then(fetchRes => fetchRes.json()).catch(e => console.log('errRes1',e))
      /*.then(resJson => console.log('fetchRes: ',resJson))
      .catch(e => console.log('errJson1: ',e))
      //.then(resJson => response.send(JSON.stringify(resJson)))
      .then(resJson => response.json(resJson))
      .catch(e => console.log('errSend1',e))*/
      .then(resJson => {
        console.log('fetchRes: ', resJson);
        response.json(resJson);
      }).catch(e => console.log('errSend1',e))
    //console.log('request: ', request);
    //console.log('request: ', reqJson);
    //console.log('response: ', response);
    console.log('end sentiment');
    //response.send('Got Message!');
})
