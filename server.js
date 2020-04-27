// server.js
// where your node app starts

// we've started you off with Express (https://expressjs.com/)
// but feel free to use whatever libraries or frameworks you'd like through `package.json`.
const express = require("express");
const app = express();

const shortid = require("shortid");

app.set('view engine','pug');
app.set('views','./views');

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
 
const adapter = new FileSync('db.json');
const db = low(adapter);
 
// Set some defaults
//db.defaults({ todos: []}).write();

// https://expressjs.com/en/starter/basic-routing.html
app.get("/", (req, res) => {
  res.render('index',{
    todos: db.get('todos').value()
  });
});

app.get("/todos", (req, res) => {
  var q = req.query.q;
  var matchTodos = db.get('todos').value().filter(function(todo){
    return todo.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
  })
  res.render('index',{
    todos: matchTodos
  });
});

app.get("/todos/delete/")

app.post("/todos/create", (req, res) => {
  req.body.id = shortid.generate();
  db.get('todos').push(req.body).write();
  res.redirect("/");
})

// listen for requests :)
app.listen(process.env.PORT, () => {
  console.log("Server listening on port " + process.env.PORT);
});
