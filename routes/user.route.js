const express = require("express");
const shortid = require("shortid");

const db = require("../db");
const router = express.Router();


// https://expressjs.com/en/starter/basic-routing.html
router.get("/", (req, res) => {
  res.render('users/index',{
    users: db.get('users').value()
  });
});

router.get("/:id/delete", (req, res)=> {
  var id = req.params.id;
  var book = db.get('users').find({id: id}).value();
  db.get('users').remove(book).write();
  res.redirect("/users");
});

router.get("/:id/update", (req, res) => {
  var id = req.params.id;
  var user = db.get('users').find({id: id}).value();
  res.render('users/update',{
    user: user
  });
});

router.post("/:id/update", (req, res)=> {
  var id = req.params.id;
  var text = req.body;

  db.get('users').find({id: id}).assign(text).write();
  
  res.redirect("/users");
});

router.post("/create", (req, res) => {
  req.body.id = shortid.generate();
  db.get('users').push(req.body).write();
  res.redirect("/users");
});

module.exports = router;

