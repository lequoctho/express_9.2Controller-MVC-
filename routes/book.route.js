const express = require("express");
const shortid = require("shortid");

const db = require("../db");
const router = express.Router();

router.get("/", (req, res) => {
  res.render('books/index',{
    books: db.get('books').value()
  });
});

router.get("/:id/delete", (req, res)=> {
  var id = req.params.id;
  var book = db.get('books').find({id: id}).value();
  db.get('books').remove(book).write();
  res.redirect("/books");
});

router.get("/update/:id", (req, res) => {
  var id = req.params.id;
  var book = db.get('books').find({id: id}).value();
  res.render('books/update',{
    book: book
  });
});

router.post("/:id/update", (req, res)=> {
  var id = req.params.id;
  var text = req.body;
  console.log(text);
  db.get('books').find({id: id}).assign(text).write();

  res.redirect("/books");
});

router.post("/create", (req, res) => {
  req.body.id = shortid.generate();
  db.get('books').push(req.body).write();
  res.redirect("/books");
});

module.exports = router;