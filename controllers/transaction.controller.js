const db = require("../db");
const shortid = require("shortid");

module.exports.index = (req, res) => {
  var users = db.get('users').value();
  var books = db.get('books').value();
  var transaction = 
  res.render('transaction/index',{
    users: users,
    books: books,
    transactions: db.get('transactions').value()
  });
};
  
module.exports.create = (req, res) => {
  
  req.body.id = shortid.generate();
  db.get('transactions').push(req.body).write();
  console.log(req.body);
  res.redirect("/transactions");
};