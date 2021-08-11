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
const AdminJS = require ('adminjs');
const { buildAuthenticatedRouter } = require('@adminjs/express');
const AdminJSSequelize = require('@adminjs/sequelize');
const { sequelize }= require('./models');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const app = express();

sequelize.sync({ force: false }).then(() => {
    console.log('데이터베이스 연결 성공');
  }).catch((err) => {
    console.error(err);
  });

// // redis 세팅 
const redisClient = redis.createClient({host: "redis", logErrors: true,})
  

// // admin 사이트 제작 
AdminJS.registerAdapter(AdminJSSequelize)
  const admin = new AdminJS({
    databases: [sequelize],
  })
admin.watch()

const router = buildAuthenticatedRouter(admin,{
    authenticate: async (email, password) => {
    if ("admin" === password && "admin" === email) {
      return {email:"admin",password:"admin"}
    }
      return null
    },
  cookieName: 'adminBro',
  cookiePassword: 'adminBro'
})
app.use(admin.options.rootPath, router)  
app.use(helmet());
app.use(morganMiddleware)
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', indexRouter);
app.use('/users',usersRouter);

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
});

const server = app.listen(3000, () => {
  logger.info(`Server Start Listening on port ${3000}`)
});

webSocket(server,app)

module.exports = app;
