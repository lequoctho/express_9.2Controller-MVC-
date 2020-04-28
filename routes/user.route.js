const express = require("express");
const shortid = require("shortid");

const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const router = express.Router();

// user
const adapterUser = new FileSync('dbUser.json');
const dbUser = low(adapterUser);

// Set some defaults
dbUser.defaults({users: []}).write();

// https://expressjs.com/en/starter/basic-routing.html
router.get("/", (req, res) => {
  res.render('users/index',{
    users: dbUser.get('users').value()
  });
});

router.get("/:id/delete", (req, res)=> {
  var id = req.params.id;
  var book = dbUser.get('users').find({id: id}).value();
  dbUser.get('users').remove(book).write();
  res.redirect("/users");
});

router.get("/:id/update", (req, res) => {
  var id = req.params.id;
  var user = dbUser.get('users').find({id: id}).value();
  res.render('users/update',{
    user: user
  });
});

router.post("/:id/update", (req, res)=> {
  var id = req.params.id;
  var text = req.body;

  dbUser.get('users').find({id: id}).assign(text).write();
  
  res.redirect("/users");
});

router.post("/create", (req, res) => {
  req.body.id = shortid.generate();
  dbUser.get('users').push(req.body).write();
  res.redirect("/users");
});

module.exports = router;

