const express = require("express");
const SpotifyWebApi = require("spotify-web-api-node");
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
// const SpotifyWebApi = SpotifyWebApi
const port = 3000;
// app.use(express.json()); // converts data into json between front and back 
// app.use(express.static('./sq-ui/src')); // connects back to front
app.use(cors())
app.use(bodyParser.json())

app.post('/login', (req,res) => {
  const code = req.body.code

  const spotifyApi = new SpotifyWebApi({
    redirectUri:'http://localhost:3000',
    clientId:'dfe14fe582f44c358b2e05ded123ee70',
    clientSecret:'e09034ca3fb346ccaa929bb1559a9571'
  })

  spotifyApi.authorizationCodeGrant(code).then(data =>{
    res.json({
      accessToken: data.body.access_token,
      refreshToken: data.body.refresh_token,
      expiresIn: data.body.expires_in
    })
  })
  .catch(()=>{
    res.sendStatus(400);
  })
})


app.listen(3001);
