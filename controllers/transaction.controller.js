const db = require("../db");
const shortid = require("shortid");

module.exports.index = (req, res) => {
  var users = db.get('users').value();
  var books = db.get('books').value();
  var transactions = db.get('transactions').value().map((objTransaction) => {
    objTransaction.userId = users.find(user=>user.id === objTransaction.userId).text;
    objTransaction.bookId = books.find(book=>book.id === objTransaction.bookId).text;
    return objTransaction;
  });
  res.render('transaction/index',{
    users: users,
    books: books,
    transactions: transactions
  });
};
  
module.exports.create = (req, res) => {
  
  req.body.id = shortid.generate();
  db.get('transactions').push(req.body).write();
  console.log(req.body);
  res.redirect("/transactions");
};