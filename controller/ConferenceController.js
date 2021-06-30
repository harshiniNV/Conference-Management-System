// importing router from Koa
//@NVR HARSHINI
const Router = require('@koa/router');
const Conference = require('../model/Conference');

const router = new Router({
    prefix: '/api/v1/conference'
});

router.get('/', async (request) => {

    try {
        // without joining
        //const conference = await Conference.find();

        // joining with FK elements
        const conference = await Conference.aggregate([
            {
                $lookup:
                    {
                        from: "conferencecategories",
                        localField: "category",
                        foreignField: "_id",
                        as: "categoryDetails"
                    }
            }
        ]);

        console.log(conference);
        console.log(JSON.stringify(conference));
        request.body = conference;

    } catch (error) {
        request.body = error;
    }

});

router.post('/', async (request) => {

    const conference = new Conference({
        code: request.request.body.code,
        name: request.request.body.name,
        category: request.request.body.category,
        date: request.request.body.date,
        time: request.request.body.time,
        description: request.request.body.description,
        status: "Pending",
    });

    console.log(conference.toJSON());

    try {
        const getConference = await conference.save();
        console.log(getConference);
        request.body = getConference;

    } catch (error) {
        request.body = error;
    }

});

router.get('/:id', async (request) => {

    try {
        const oneConference = await Conference.findById(request.params.id);
        console.log(oneConference);
        request.response.status = 200;
        request.body = oneConference;

    } catch (error) {
        request.body = error;
    }

});

// admin function for confirmation of conference details
router.patch('/:id', async (ctx) => {

    try {
        const conference = await Conference.findById(ctx.params.id);
        conference.status = ctx.request.body.status;
        const getConference = await conference.save();
        console.log(getConference);
        ctx.body = getConference;
    } catch (error) {
        ctx.body = error;
    }

});

router.put('/:id', async (ctx) => {

    try {

        const conference = await Conference.findById(ctx.params.id);

        conference.code = ctx.request.body.code;
        conference.name = ctx.request.body.name;
        conference.category = ctx.request.body.category;
        conference.date = ctx.request.body.date;
        conference.time = ctx.request.body.time;
        conference.description = ctx.request.body.description;


        const getConference = await conference.save();
        console.log(getConference);
        ctx.body = getConference;

    } catch (error) {
        ctx.body = error;
    }

});

router.delete('/:id', async (request) => {

    try {
        const conference = await Conference.findById(request.params.id);
        const delConference = await conference.delete();
        console.log(delConference);
        request.body = "DELETED " + delConference;

    } catch (error) {
        request.body = error;
    }

});
module.exports = router;