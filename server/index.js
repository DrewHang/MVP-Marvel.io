const express = require('express');
const path = require('path');
require('dotenv').config();
const axios = require('axios');
const md5 = require('md5')
// const regeneratorRuntime = require("regenerator-runtime");
const server = express();
const PORT = 3002
const PUBLIC_DIR = path.resolve(__dirname, '..','client','dist')


server.use(express.json())
server.use(express.static(PUBLIC_DIR))

const DATE = new Date().getTime();
const ts = new Date().getTime();
const stringToHash = ts + process.env.PUB_KEY + process.env.PRIVATE_KEY;
const hash = md5(stringToHash);
const baseUrl = 'https://gateway.marvel.com:443/v1/public/characters?nameStartsWith=Spider-Gwen&orderBy=name';
const url = baseUrl + '&ts=' + ts + '&apikey=' + process.env.PUB_KEY + '&hash=' + hash;


server.get('/api/spider-gwen', (req, res) => {

  req.query.nameStartsWith = 'Spider-Gwen';
  req.query.ts = ts;
  req.query.hash = hash;
  req.query.apikey = process.env.PUB_KEY;

  axios.get(`https://gateway.marvel.com:443/v1/public/characters`)
    .then(({ data }) => {
      console.log(data)
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});


server.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:${PORT}`)
})