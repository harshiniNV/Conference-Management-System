// importing router from Koa
//@NVR HARSHINI
const Router = require('@koa/router');
const ConferanceCategory = require('../model/ConferenceCategory');

const router = new Router({
    prefix: '/api/v1/conferance-category'
});

router.get('/', async (request) => {

    try {
        const categories = await ConferanceCategory.find();
        console.log(categories);
        request.body = categories;

    } catch (error) {
        request.body = error;
    }

});

router.post('/', async (request) => {

    const conferanceCategory = new ConferanceCategory({
        code: request.request.body.code,
        name: request.request.body.name
    });
    console.log(conferanceCategory.toJSON());
    try {
        const getCategory = await conferanceCategory.save();
        console.log(getCategory);
        request.body = getCategory;

    } catch (error) {
        request.body = error;
    }

});

router.get('/:id', async (request) => {

    try {
        const oneBook = await ConferanceCategory.findById(request.params.id);
        console.log(oneBook);
        request.response.status = 200;
        request.body = oneBook;
        // request.body = oneBook;
    } catch (error) {
        request.body = error;
    }

});

router.put('/:id', async (request) => {

    try {

        const conferanceCategory = await ConferanceCategory.findById(request.params.id);
        conferanceCategory.code = request.request.body.code;
        conferanceCategory.name = request.request.body.name;
        const category = await conferanceCategory.save();
        console.log(category);
        request.body = category;

    } catch (error) {
        request.body = error;
    }

});

router.delete('/:id', async (request) => {

    try {
        const conferanceCategory = await ConferanceCategory.findById(request.params.id);
        const category = await conferanceCategory.delete();
        console.log(category);
        request.body = "DELETED " + category;

    } catch (error) {
        request.body = error;
    }

});
module.exports = router;