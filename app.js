const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const staticAsset = require('static-asset');
const mongoose = require('mongoose');
const config = require('./config');

/* DATABASE */
mongoose.Promise = global.Promise;
mongoose.set('debug', config.IS_PRODUCTION);
mongoose.connection
    .on('error', error => console.log(error))
    .on('close', () => console.log('Database connection closed.'))
    .once('open', () => {
        const info = mongoose.connections[0];
        console.log(`Connected to ${info.host}:${info.port}/${info.name}`);
    });
mongoose.connect(
    `mongodb://${config.database.login}:${
        config.database.password
    }@ds225492.mlab.com:25492/ref`
    //mongodb://<dbuser>:<dbpassword>@ds121371.mlab.com:21371/blog
    //mongodb://<dbuser>:<dbpassword>@ds261040.mlab.com:61040/track
    //mongodb://<dbuser>:<dbpassword>@ds225492.mlab.com:25492/ref
);
// Mongoose MODELS
// const Post = require('./models/post');
const Product = require('./models/product');
/* DATABASE _end */

/* EXPRESS */
const app = express();

/* SETS AND USES */
// set for ejs
app.set('view engine', 'ejs');
// use body-parser
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
// use for my static assets
app.use(staticAsset(path.join(__dirname, 'public')));
// use for static files
app.use(express.static(path.join(__dirname, 'public')));
// uses for JS
app.use(
    '/javascripts',
    express.static(path.join(__dirname, 'node_modules', 'jquery', 'dist'))
);
app.use(
    '/javascripts',
    express.static(
        path.join(__dirname, 'node_modules', 'popper.js', 'dist', 'umd')
    )
);
app.use(
    '/javascripts',
    express.static(
        path.join(__dirname, 'node_modules', 'bootstrap', 'dist', 'js')
    )
);
// uses for CSS
app.use(
    '/stylesheets',
    express.static(
        path.join(__dirname, 'node_modules', 'bootstrap', 'dist', 'css')
    )
);

/* SETS AND USES _END*/

/* ROUTERS */
app.get('/p1', (req, res) => {
    res.render('pages/p1');
});
app.get('/p2', (req, res) => {
    res.render('pages/p2');
});
app.get('/p3', (req, res) => {
    res.render('pages/p3');
});
app.get('/p4', (req, res) => {
    res.render('pages/p4');
});
app.get('/p5', (req, res) => {
    res.render('pages/p5');
});
app.get('/', (req, res) => {
    res.render('pages/homepage');
});
app.get('/page1', (req, res) => {
    res.render('pages/page1');
});
app.get('/page2', (req, res) => {
    res.render('pages/page2');
});
app.get('/page3', (req, res) => {
    res.render('pages/page3');
});
app.get('/page4', (req, res) => {
    res.render('pages/page4');
});
app.get('/page5', (req, res) => {
    res.render('pages/page5');
});
app.get('/page6', (req, res) => {
    res.render('pages/page6');
});
app.get('/page7', (req, res) => {
    res.render('pages/page7');
});
app.get('/page8', (req, res) => {
    res.render('pages/page8');
});
app.get('/page9', (req, res) => {
    res.render('pages/page9');
});
app.get('/page10', (req, res) => {
    res.render('pages/page10');
});

app.get('/try', (req, res) => {
    res.render('try');
});

app.get('/hi', (req, res) => {
    res.render('hi');
});

app.get('/posts', (req, res) => {
    console.log(`__dirname = ${__dirname}`);

    // Post.find({}).then(posts => {
    //     console.log(posts);
    //     res.render('index', {
    //         posts: posts
    //     });
    // });
});

app.get('/create', (req, res) => res.render('create'));
app.post('/create', (req, res) => {
    const {
        title,
        body
    } = req.body;

    // Post.create({
    //     title: title,
    //     body: body
    // }).then(post => {
    //     console.log(post);
    // });

    res.redirect('/');
});

app.get('/search', (req, res) => res.render('search'));
app.post('/search', (req, res) => {
    // http://mongoosejs.com/docs/2.7.x/docs/finding-documents.html
    // data library - https://stackoverflow.com/questions/38182501/how-to-get-current-datetime-with-format-y-m-d-hms-using-node-datetime-library/38182551

    // Product.findOne({})
    //     .then(products => {
    //         console.log(products);
    //         res.render('search', {
    //             products: products
    //         });
    //     })
    //     .catch(() => {
    //         res.redirect('search', {
    //             error: 'Ничего не найдено по вашему запросу.'
    //         });
    //     });

    //5b7a98a4e7179a69ea61817f
    //5b7a98b3e7179a69ea618186
    const trackID = req.body.trackID;
    Product.findOne({
            _id: trackID
        })
        .then(products => {
            console.log(products);
            res.render('search', {
                products: products
            });
        })
        .catch(() => {
            res.render('search', {
                error: 'Ничего не найдено по вашему запросу.'
            });
        });
});
/* ROUTERS _END*/

/* ERROR HANDLERS */
// catch 404 and forward to error handler
app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});

// error handler
// eslint-disable-next-line no-unused-vars
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.render('error', {
        message: error.message,
        error: !config.IS_PRODUCTION ? error : {}
    });
});
/* ERROR HANDLERS _END*/

/* LISTEN */
app.listen(config.PORT, () => {
    console.log(`**LISTEN**`);
    console.log(`Config port: ${config.PORT}!`);
    console.log(`Config IS_PRODUCTION: ${config.IS_PRODUCTION}`);
    console.log(`**LISTEN _END**`);
});
/* LISTEN _END*/