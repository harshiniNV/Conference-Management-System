// importing router from Koa
//@NVR HARSHINI
const Router = require('@koa/router');
const User = require('../model/User');
// importing bcrypt for encrypting the password
const bcrypt = require('bcrypt');
const saltRounds = 10;

const router = new Router({
    prefix: '/api/v1/user'
});

router.get('/', async (request) => {

    try {
        const users = await User.find();
        console.log(users);
        request.body = users;

    } catch (error) {
        request.body = error;
    }

});

router.post('/', async (request) => {

    const user = new User({
        code: request.request.body.code,
        name: request.request.body.name,
        role: request.request.body.role,
        email: request.request.body.email,
        password: await bcrypt.hash(request.request.body.password, saltRounds),
        description: request.request.body.description,
    });
    console.log(user.toJSON());
    try {
        const getUser = await user.save();
        console.log(getUser);
        request.body = getUser;

    } catch (error) {
        request.body = error;
    }

});

router.post('/login', async (request) => {

    const user = new User({
        email: request.request.body.email,
        password: request.request.body.password
    });

    try {
        const authUser = await User.findOne({email: user.email});

        if (authUser) {
            // check user password with hashed password stored in the database
            const auth = await bcrypt.compare(user.password, authUser.password);
            if (auth) {
                const loginCredentials = {
                    username: authUser.name,
                    role: authUser.role,
                    status: "loggedIn",
                    isLoggedIn: true

                }
                request.body = [authUser,loginCredentials];
            } else {
                const loginCredentials = {
                    status: "login failed",
                    isLoggedIn: false
                }
                request.body = loginCredentials;
            }
        } else {
            const loginCredentials = {
                status: "login failed",
                isLoggedIn: false
            }
            request.body = loginCredentials;
        }
    } catch (error) {
        request.body = error;
    }
});


module.exports = router;