const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const msanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const ratelimit = require("express-rate-limit");
const courseRouter = require('./routes/course');
const userRouter = require('./routes/user');
const contentRouter = require('./routes/content');

const app = express();

app.use(cors());
app.use(helmet());

app.use('/api', ratelimit({
    max: 1000,
    windowMs: 60 * 60 * 1000,
    message: 'Too many requests try again later'
}));

app.use(express.json());
app.use(msanitize());
app.use(xss());

app.use("/api/v1/course", courseRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/content", contentRouter);


module.exports = app;
