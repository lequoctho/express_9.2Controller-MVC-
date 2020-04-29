// server.js
// where your node app starts

// we've started you off with Express (https://expressjs.com/)
// but feel free to use whatever libraries or frameworks you'd like through `package.json`.
const express = require("express");
const shortid = require("shortid");

const routeUser = require("./routes/user.route");

const app = express();

const db = require("./db");

app.set('view engine','pug');
app.set('views','./views');

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded



// https://expressjs.com/en/starter/basic-routing.html
app.get("/books", (req, res) => {
  res.render('index',{
    books: db.get('books').value()
  });
});

app.get("/books/:id/delete", (req, res)=> {
  var id = req.params.id;
  var book = db.get('books').find({id: id}).value();
  db.get('books').remove(book).write();
  res.redirect("/books");
});

app.get("/books/update/:id", (req, res) => {
  var id = req.params.id;
  var book = db.get('books').find({id: id}).value();
  res.render('update',{
    book: book
  });
});

app.post("/books/:id/update", (req, res)=> {
  var id = req.params.id;
  var text = req.body;
  console.log(text);
  db.get('books').find({id: id}).assign(text).write();

  res.redirect("/books");
});

app.post("/books/create", (req, res) => {
  req.body.id = shortid.generate();
  db.get('books').push(req.body).write();
  res.redirect("/books");
});

app.use('/users', routeUser);

// listen for requests :)
app.listen(process.env.PORT, () => {
  console.log("Server listening on port " + process.env.PORT);
});
