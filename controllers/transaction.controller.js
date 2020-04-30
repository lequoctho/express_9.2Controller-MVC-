const db = require("../db");
const shortid = require("shortid");

module.exports.index = (req, res) => {
  res.render('transaction/index',{
    users: db.get('users').value(),
    books: db.get('books').value(),
    transactions: db.get('transactions').value()
  });
};
  
module.exports.create = (req, res) => {
  
  req.body.id = shortid.generate();
  db.get('transactions').push(req.body).write();
  console.log(req.body);
  res.redirect("/transactions");
};