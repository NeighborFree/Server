const createError = require('http-errors');
const helmet = require('helmet');
const passport = require('passport');
const express = require('express');
const cookieParser = require('cookie-parser');
const morganMiddleware = require('./.config/morgan');
const session = require('express-session');
const RedisStore = require('connect-redis')(session)
const logger = require('./.config/winston');
const redis = require('redis');
const webSocket = require("./socket/socket");
const AdminBro = require('admin-bro');
const AdminBroExpress = require('@admin-bro/express');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const app = express();

// admin 사이트 제작 
const adminBro = new AdminBro({
  databases: []
})
const router = AdminBroExpress.buildRouter(adminBro)

app.use(adminBro.options.rootPath, router)
app.use(helmet());
app.use(morganMiddleware)
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', indexRouter);
app.use('/users',usersRouter);

const redisClient = redis.createClient({
   host: "127.0.0.1", 
   port:6379,
   logErrors: true,
   db:0,
  })
// redis 세팅 
app.use(session({
    secret: "secret",
    saveUninitialized: true,
    resave: false,
    store: new RedisStore({
        client : redisClient
    })
}))
app.use(passport.initialize())
app.use(passport.session())

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});


app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

const server = app.listen(3000, () => {
  logger.info(`Server Start Listening on port ${3000}`)
});

webSocket(server,app)

module.exports = app;
