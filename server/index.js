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


server.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:${PORT}`)
})