const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const routeHandler = require("./index");
const config = require("./config");
app.set("view engine", "pug");
app.use(cors());
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept,x-access-token"
    );
    res.header("Access-Control-Allow-Credentials", "true");
    next();
});
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use("/api", routeHandler);
app.all("*", (req, res) => {
    return res.status(404).json({
        success: false,
        msg: "not found*"
    });
});

app.listen(config.port, config.ip, () => {
    console.log(`server is running on port ${config.port}`);
});

