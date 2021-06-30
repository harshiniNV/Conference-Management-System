// importing router from Koa
//@NVR HARSHINI
const Router = require('@koa/router');
const Speaker = require('../model/Speaker');

const router = new Router({
    prefix: '/api/v1/speaker'
});

router.get('/', async (request) => {

    try {
        const speakers = await Speaker.find();
        console.log(speakers);
        request.body = speakers;

    } catch (error) {
        request.body = error;
    }

});

router.post('/', async (request) => {

    const speaker = new Speaker({
        code: request.request.body.code,
        name: request.request.body.name,
        type: request.request.body.type,
        qualification: request.request.body.qualification,
        description: request.request.body.description
    });
    console.log(speaker.toJSON());
    try {
        const getSpeaker = await speaker.save();
        console.log(getSpeaker);
        request.body = getSpeaker;

    } catch (error) {
        request.body = error;
    }

});

router.get('/:id', async (request) => {

    try {
        const oneSpeaker = await Speaker.findById(request.params.id);
        console.log(oneSpeaker);
        request.response.status = 200;
        request.body = oneSpeaker;
        // request.body = oneBook;
    } catch (error) {
        request.body = error;
    }

});

router.put('/:id', async (ctx) => {

    try {

        const speaker = await Speaker.findById(ctx.params.id);
        speaker.code = ctx.request.body.code;
        speaker.name = ctx.request.body.name;
        speaker.type = ctx.request.body.type;
        speaker.qualification = ctx.request.body.qualification;
        speaker.description = ctx.request.body.description;

        const getSpeaker = await speaker.save();
        console.log(getSpeaker);
        ctx.body = getSpeaker;

    } catch (error) {
        ctx.body = error;
    }

});

router.delete('/:id', async (request) => {

    try {
        const speaker = await Speaker.findById(request.params.id);
        const getSpeaker = await speaker.delete();
        console.log(getSpeaker);
        request.body = "DELETED " + getSpeaker;

    } catch (error) {
        request.body = error;
    }

});
module.exports = router;