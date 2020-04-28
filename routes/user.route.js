const express = require("express");

const router = express.Router();

// user
const adapterUser = new FileSync('dbUser.json');
const dbUser = low(adapterUser);

// Set some defaults
dbUser.defaults({users: []}).write();

// https://expressjs.com/en/starter/basic-routing.html
app.get("/users", (req, res) => {
  res.render('indexUsers',{
    users: dbUser.get('users').value()
  });
});

app.get("/users/:id/delete", (req, res)=> {
  var id = req.params.id;
  var book = dbUser.get('users').find({id: id}).value();
  dbUser.get('users').remove(book).write();
  res.redirect("/users");
});

app.get("/users/:id/update", (req, res) => {
  var id = req.params.id;
  var user = dbUser.get('users').find({id: id}).value();
  res.render('updateUser',{
    user: user
  });
});

app.post("/users/:id/update", (req, res)=> {
  var id = req.params.id;
  var text = req.body;

  dbUser.get('users').find({id: id}).assign(text).write();
  
  res.redirect("/users");
});

app.post("/users/create", (req, res) => {
  req.body.id = shortid.generate();
  dbUser.get('users').push(req.body).write();
  res.redirect("/users");
});

