// In this class route of APIs has defined
const express = require("express")
const app = express()
const mailController = require('../controller/mailController');

app.post('/login', mailController.login);
app.get('/showInbox', mailController.showInbox);
app.post('/sendEmail', mailController.sendEmail);
app.get('/getSentItems', mailController.getSentItems);
app.post('/markUnseenAsSeen', mailController.markUnseenAsSeen);
app.post('/deleteEmail', mailController.deleteEmail);
app.get('/getAllDeletedItems', mailController.getAllDeletedItems);
app.get('/numberOfUnseen', mailController.numberOfUnseen)
module.exports = app
console.log('here')


