# Mail Client in Node.js and React.js
This is a Mail Client written in Node.js for Back-end using express and React.js for Front-end. We use IMAP (Internet Message Access Protocol) to connect to your mail accout.
In case you want to use our app, you need to set your account security setting to low to allow connections from unknows apps. 

### Features
- Login in your Email account
- Fetch all you Inbox Items and Sent Items
- Compose Mail
- Sync and fetch new email, at any time
- Delete Emails

#### How to Run?
1. Setup a redis-server for handling tokens.
2. Run `npm install` in the root of the project for downloading Back-end libraries.
3. Run `node server.js` in the root of the project for running Back-end.
4. Run `npm install` in  view\inbox for Front-end for downloading Front-end libraries.
5. Run `npm start` in view\inbox for Front-end.
6. Login in our mail Client and Enjoy!!!
