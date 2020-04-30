const db = require("../db");
const shortid = require("shortid");

module.exports.index = (req, res) => {
  var users = db.get('users').value();
  var books = db.get('books').value();
  var transaction = db.get('transactions').value().map((objTransaction) => {
    users.find(user=>user.id === objTransaction.userId);
  })
  res.render('transaction/index',{
    users: users,
    books: books,
    transactions: 
  });
};
  
module.exports.create = (req, res) => {
  
  req.body.id = shortid.generate();
  db.get('transactions').push(req.body).write();
  console.log(req.body);
  res.redirect("/transactions");
};