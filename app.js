//@NVR HARSHINI
// import the domain packages
const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const mongoose = require('mongoose');

//importing API controllers and EP's
const categoryRoutes = require('./controller/ConferenceCategoryController');
const conferenceRoutes = require('./controller/ConferenceController');
const speakerRoutes = require('./controller/SpeakerController');
const userRoutes = require('./controller/UserController');


const app = new Koa();

//Database config
const URL = 'mongodb://localhost/cms';

//establish the connection
mongoose.connect(URL, {useNewUrlParser: true});
const connection = mongoose.connection;

connection.on('open', () => {
    console.log("connected...");
});

app.use(bodyParser());

app.use(categoryRoutes.routes()).use(categoryRoutes.allowedMethods());
app.use(conferenceRoutes.routes()).use(conferenceRoutes.allowedMethods());
app.use(speakerRoutes.routes()).use(speakerRoutes.allowedMethods());
app.use(userRoutes.routes()).use(userRoutes.allowedMethods());


// cross origin policy setup
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.listen(9000, () => {
    console.log("Server listening on port 9000");
});