// server.js
// where your node app starts

// we've started you off with Express (https://expressjs.com/)
// but feel free to use whatever libraries or frameworks you'd like through `package.json`.
const express = require("express");
const app = express();

app.set('view engine','pug');
app.set('views','./views');

var actions = [
  {id:1, name: 'đi chợ'},
  {id:2, name: 'nấu ăn'},
  {id:3, name: 'rửa bát'},
  {id:4, name: 'học codersX'}
];

// https://expressjs.com/en/starter/basic-routing.html
app.get("/todos", (req, res) => {
  res.render('index',{
    actions: actions
  });
});

app.get("")

// listen for requests :)
app.listen(process.env.PORT, () => {
  console.log("Server listening on port " + process.env.PORT);
});
