// server.js
// where your node app starts

// we've started you off with Express (https://expressjs.com/)
// but feel free to use whatever libraries or frameworks you'd like through `package.json`.
const express = require("express");
const app = express();

app.set('view engine','pug');
app.set('views','./views');

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

var actions = [
  {id:1, name: 'đi chợ'},
  {id:2, name: 'nấu ăn'},
  {id:3, name: 'rửa bát'},
  {id:4, name: 'học codersX'},
  {id:5, name: 'đá bóng'}
];

// https://expressjs.com/en/starter/basic-routing.html
app.get("/", (req, res) => {
  res.render('index',{
    actions: actions
  });
});

app.get("/todos", (req, res) => {
  var q = req.query.q;
  var matchAction = actions.filter(function(action){
    return action.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
  })
  res.render('index',{
    actions: matchAction
  });
});

app.post("/todos/create", (req, res) => {
  actions.push(req.body);
  res.redirect("/");
})

// listen for requests :)
app.listen(process.env.PORT, () => {
  console.log("Server listening on port " + process.env.PORT);
});
