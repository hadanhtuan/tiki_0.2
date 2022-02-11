const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const config = require('./config/databases')
const bodyParser = require('body-parser')
const session = require('express-session')
const expressValidator = require('express-validator')
const methodOverride = require('method-override')

//init app
const app = express()

//template engine setup
app.set('view engine', 'ejs')

//set public folder
app.use(express.static('public'))

//connect to mongoose
mongoose.connect(config.databases)

// Set global errors variable
// app.locals.messages = null;

//router
const pagesRouter = require('./routes/pages')
const adminPagesRouter = require('./routes/admin_pages')
const adminCategoriesRouter = require('./routes/admin_categories')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json()) 

//set method override
app.use(methodOverride('_method'))

// //express session middleware
// app.use(session({
//     secret: 'keyboard cat',
//     resave: false,
//     saveUninitialized: true,
//     cookie: { secure: true }
//   }))

// //express message middleware
// app.use(require('connect-flash')());
// app.use(function (req, res, next) {
//   res.locals.messages = require('express-messages')(req, res);
//   next();
// });

//express validator middleware
app.use(expressValidator({
    errorFormatter: function (param, msg, value) {
        var namespace = param.split('.')
                , root = namespace.shift()
                , formParam = root;

        while (namespace.length) {
            formParam += '[' + namespace.shift() + ']';
        }
        return {
            param: formParam,
            msg: msg,
            value: value
        };
    }
}))

app.use('/admin/pages', adminPagesRouter)
app.use('/admin/categories', adminCategoriesRouter)
app.use('/', pagesRouter)

//start the server
const port = 3000
app.listen(port, () => {})












