const imaps = require('imap-simple');
const TokenController = require('../controller/tokenController');
const CircularJSON = require('circular-json');
var Email = require('../model/email');
var htmlToText = require('html-to-text');
var jsdom = require('jsdom')
const { JSDOM } = jsdom;
const nodemailer = require('nodemailer');
const { request } = require('../route');
//var chilkat = require('@chilkat/ck-node11-win64')
//const redisClient = require('../utils/tooRedis');
module.exports = new class mailController {
    constructor() {
        this.models = {

        }
    }



    async login(req, res) {


        console.log(typeof req.body.email)

       var config
       if (req.body.email.includes("gmail")) {
            console.log('gmaaaaaaaaaaaaaaaaaail')
            config = {
                imap: {
                    user: req.body.email,
                    password: req.body.password,
                    host: 'imap.gmail.com',
                    port: 993,
                    tls: true,
                    tlsOptions: { rejectUnauthorized: false },
                    authTimeout: 9000
                },
                nodemailer: {
                    service: 'gmail',
                    auth: {
                        user: req.body.email,
                        pass: req.body.password
                    }
                }
            };
       }

        if ((req.body.email.includes("yahoo")) || (req.body.email.includes("ymail"))) {
            console.log('yahooooooooo')
            config = {
                imap: {
                    user: req.body.email,
                    password: req.body.password,
                    host: 'imap.mail.yahoo.com',
                    port: 993,
                    tls: true,
                    tlsOptions: { rejectUnauthorized: false },
                    authTimeout: 10000
                },
                nodemailer: {
                    service: 'yahoo',
                    auth: {
                        user: req.body.email,
                        pass: req.body.password
                    }
                }
            };
        }

        try {

            imaps.connect(config).then(function (connection) {
                console.log(JSON.stringify(config.imap))
                TokenController.createToken(req.body.email, JSON.stringify(config), function (error, result) {

                    if (error) {
                        console.log(error)
                        res.status(402).send(error)
                    } else {
                        res.status(201).send({ token: result })
                    }
                })
            }, function (error) {
                console.log(error)
                res.status(402).send(error)
            });
        }
        catch (err) {
            console.log(err)
            res.status(402).send(err)
        }
    }
    async showInbox(req, res) {

        console.log('in inboooooooooooooooooox')

        if (req.headers['authorization']) {
            const bearerHeader = req.headers['authorization']
            TokenController.checkToken(bearerHeader, function (err, token_check_result) {
                if (err) {
                    res.status(401).send({
                        success: false
                    });
                } else {
                    // console.log('heeeeeeeeeeeere')
                    // console.log(token_check_result.imap)

                    imaps.connect({ imap: token_check_result.imap }).then(function (connection) {
                        return connection.openBox('INBOX').then(function () {
                            var searchCriteria = [
                                'ALL'
                            ];

                            var fetchOptions = {
                                bodies: ['HEADER', 'TEXT'],
                                markSeen: false
                            };

                            var emails = []
                            return connection.search(searchCriteria, fetchOptions).then(function (results) {

                                console.log('afteeeeeeeeeeeeeer serach')
                                for (var j = 0; j < results.length; j++) {
                                    console.log(results[j])
                                    var seenStatus = false
                                    if (results[j].attributes.flags[0] == '\\Seen') {
                                        seenStatus = true
                                    }
                                    var email = {
                                        id: results[j].attributes.uid,
                                        from: results[j].parts[1].body.from[0],
                                        to: results[j].parts[1].body.to,
                                        subject: results[j].parts[1].body.subject[0],
                                        date: results[j].parts[1].body.date[0],
                                        seen: seenStatus,
                                        text: (results[j].parts[0].body),
                                    }
                                    emails.push(email)
                                    if (emails.length == results.length) {
                                        res.status(201).send(emails)
                                    }
                                }
                            }, function (error) {
                                console.log(error)
                                res.status(402).send(error)
                            });
                        }, function (error) {
                            console.log(error)
                            res.status(402).send(error)
                        });
                    }, function (error) {
                        console.log(error)
                        res.status(402).send(error)
                    })

                }

            })

        }

    }

    async sendEmail(req, res) {

        if (req.headers['authorization']) {
            const bearerHeader = req.headers['authorization']
            TokenController.checkToken(bearerHeader, function (err, token_check_result) {
                if (err) {
                    res.status(401).send({
                        success: false
                    });
                } else {
                    // console.log('heeeeeeeeeeeere')
                    // console.log(token_check_result.nodemailer)
                    // console.log(token_check_result.nodemailer.auth.user)
                    let transport = nodemailer.createTransport(token_check_result.nodemailer);
                    const message = {
                        from: token_check_result.nodemailer.auth.user,
                        to: req.body.receivers,
                        subject: req.body.subject,
                        html: req.body.text
                    };
                    transport.sendMail(message, function (err, info) {
                        if (err) {
                            console.log(err)
                            res.status(402).send(err)
                        } else {
                            console.log(info);
                            res.status(201).send({ message: "email sent" });
                        }
                    });

                }
            })
        }

    }

    async getSentItems(req, res) {
        if (req.headers['authorization']) {
            const bearerHeader = req.headers['authorization']
            TokenController.checkToken(bearerHeader, function (err, token_check_result) {
                if (err) {
                    res.status(401).send({
                        success: false
                    });
                } else {
                    console.log('heeeeeeeeeeeere')
                    console.log(token_check_result.imap)

                    imaps.connect({ imap: token_check_result.imap }).then(function (connection) {

                        return connection.openBox('[Gmail]/Sent Mail').then(function () {
                            var fetchOptions = {
                                bodies: ['HEADER', 'TEXT', ''],
                                markSeen: false
                            };
                            var searchCriteria = [
                                'ALL'
                            ];

                            var emails = []
                            return connection.search(searchCriteria, fetchOptions).then(function (results) {
                                for (var j = 0; j < results.length; j++) {
                                    // var seenStatus = true
                                    // if (results[j].attributes.flags.length == 0) {
                                    //     seenStatus = false
                                    // }
                                    var email = {
                                        id: results[j].attributes.uid,
                                        from: results[j].parts[2].body.from[0],
                                        to: results[j].parts[2].body.to,
                                        subject: results[j].parts[2].body.subject[0],
                                        date: results[j].parts[2].body.date[0],
                                        //seen: seenStatus,
                                        text: (results[j].parts[1].body),
                                    }
                                    emails.push(email)
                                    if (emails.length == results.length) {
                                        res.status(201).send(emails)
                                    }
                                }

                            }, function (error) {
                                res.status(402).send(error)
                            });
                        }, function (error) {
                            res.status(402).send(error)
                        });
                    }, function (error) {
                        res.status(402).send(error)
                    });

                }
            })
        }

    }

    async markUnseenAsSeen(req, res) {

        if (req.headers['authorization']) {
            const bearerHeader = req.headers['authorization']
            TokenController.checkToken(bearerHeader, function (err, token_check_result) {
                if (err) {
                    res.status(401).send({
                        success: false
                    });
                } else {
                    console.log('heeeeeeeeeeeere')
                    console.log(token_check_result.imap)

                    imaps.connect({ imap: token_check_result.imap }).then(function (connection) {
                        return connection.openBox('INBOX').then(function () {
                            connection.addFlags(req.body.id, ['\\Seen'], function (err) {
                                if (err) {
                                    console.log(err);
                                } else {
                                    console.log("Marked as read!")
                                    res.status(201).send({ message: "Marked as seen" })
                                }
                            });
                        })
                    }, function (error) {
                        res.status(402).send(error)
                    });

                }
            })
        }
    }

    async deleteEmail(req, res) {
        if (req.headers['authorization']) {
            const bearerHeader = req.headers['authorization']
            TokenController.checkToken(bearerHeader, function (err, token_check_result) {
                if (err) {
                    res.status(401).send({
                        success: false
                    });
                } else {
                    console.log('heeeeeeeeeeeere')
                    console.log(token_check_result.imap)

                    imaps.connect({ imap: token_check_result.imap }).then(function (connection) {
                        return connection.openBox('INBOX').then(function () {
                            connection.addFlags(req.body.id, ['\Seen', '\Deleted'], function (err) {
                                if (err) {
                                    console.log(err);
                                } else {
                                    console.log("Deleted")
                                    res.status(201).send({ message: "Deleted" })
                                }
                            });
                        })
                    }, function (error) {
                        res.status(402).send(error)
                    });

                }
            })
        }
    }

    async getAllDeletedItems(req, res) {

        if (req.headers['authorization']) {
            const bearerHeader = req.headers['authorization']
            TokenController.checkToken(bearerHeader, function (err, token_check_result) {
                if (err) {
                    res.status(401).send({
                        success: false
                    });
                } else {
                    console.log('heeeeeeeeeeeere')
                    console.log(token_check_result.imap)

                    imaps.connect({ imap: token_check_result.imap }).then(function (connection) {

                        return connection.openBox('Sent Mail').then(function () {
                            var fetchOptions = {
                                bodies: ['HEADER', 'TEXT', ''],
                                markSeen: false
                            };
                            var searchCriteria = [
                                'ALL'
                            ];

                            var emails = []
                            return connection.search(searchCriteria, fetchOptions).then(function (results) {
                                for (var j = 0; j < results.length; j++) {
                                    // var seenStatus = true
                                    // if (results[j].attributes.flags.length == 0) {
                                    //     seenStatus = false
                                    // }
                                    var email = {
                                        id: results[j].attributes.uid,
                                        from: results[j].parts[2].body.from[0],
                                        to: results[j].parts[2].body.to,
                                        subject: results[j].parts[2].body.subject[0],
                                        date: results[j].parts[2].body.date[0],
                                        //seen: seenStatus,
                                        text: (results[j].parts[1].body),
                                    }
                                    emails.push(email)
                                    if (emails.length == results.length) {
                                        res.status(201).send(emails)
                                    }
                                }

                            }, function (error) {
                                res.status(402).send(error)
                            });
                        }, function (error) {
                            res.status(402).send(error)
                        });
                    }, function (error) {
                        res.status(402).send(error)
                    });

                }
            })
        }

    }

    async numberOfUnseen(req,res){

        if (req.headers['authorization']) {
            const bearerHeader = req.headers['authorization']
            TokenController.checkToken(bearerHeader, function (err, token_check_result) {
                if (err) {
                    res.status(401).send({
                        success: false
                    });
                } else {
                    imaps.connect({ imap: token_check_result.imap }).then(function (connection) {
                        return connection.openBox('INBOX').then(function () {
                            var searchCriteria = [
                                'UNSEEN'
                            ];

                            var fetchOptions = {
                                bodies: ['HEADER', 'TEXT'],
                                markSeen: false
                            };
                            return connection.search(searchCriteria, fetchOptions).then(function (results) {
                                console.log(results.length)
                                res.status(201).send({number_of_unseen : results.length})


                            }, function (error) {
                                res.status(402).send(error)
                            })

                        }, function (error) {
                            res.status(402).send(error)
                        })

                    }, function (error) {
                        res.status(402).send(error)
                    })

                }

            })

        }
    }

}