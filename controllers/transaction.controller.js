const db = require("../db");
const shortid = require("shortid");

module.exports.index = (req, res) => {
   var users = db.get('users').value();
//   console.log(users);
   var books = db.get('books').value();
   var transactionsDB = db.get('transactions').value();
//   var transactions = transactionsDB.map((objTransaction) => {
//     console.log(objTransaction);
//     var user = users.find(user=>user.id === objTransaction.userId);
//     var book = books.find(book=>book.id === objTransaction.bookId);
    
//     objTransaction.userId = user.text;
//     objTransaction.bookId = book.text;
//     return objTransaction;
//   });
  res.render('transaction/index',{
    users: users,
    books: books,
    transactions: transactionsDB
  });
};
  
module.exports.create = (req, res) => {
  req.body.id = shortid.generate();
  req.body.complete = "false";
  db.get('transactions').push(req.body).write();

  res.redirect("/transactions");
};

module.exports.complete = (req, res) => {
  var id = req.params.id;

  db.get('transactions').find({id: id}).assign({complete: true}).write();

  res.redirect("/transactions");
}