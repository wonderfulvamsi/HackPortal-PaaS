const router = require('express').Router();

let EventData = require('../models/eventModel');

let UserData = require('../models/userModel');

let TeamData = require('../models/teamModel');

let SubmissionData = require('../models/submissionModel');

require('dotenv').config();

//get all events
router.get('/allevents', async (req, res) => {
    res.status(200).json(await EventData.find())
})

//get an event info
router.get('/allevents', async (req, res) => {
    res.status(200).json(await EventData.findOne({ event_name: req.body.event_name }));
})

//create an event
router.post('/createevent', async (req, res) => {
    try {
        const newevent = new EventData({
            event_name: req.body.event_name,
            event_logo: req.body.event_logo,
            event_wall_pic: req.body.event_wall_pic,
            event_link: req.body.event_link,
            event_disc: req.body.event_disc,
            event_social_links: req.body.event_social_links,
            prizes: req.body.prizes,
            judges: req.body.judges,
            sponsors: req.body.sponsors,
            timeline: req.body.timeline,
            teams: req.body.teams,
            announcemts: req.body.announcemts
        });
        res.status(500).json(await newevent.save())
    }
    catch (err) {
        res.status(500).json(err)
    }
})

//update event 
router.patch('/updateevent', async (req, res) => {
    try {
        const event = await EventData.findOne({ event_name: req.body.event_name });
        res.status(500).json(await event.updateOne(
            {
                event_name: req.body.event_name,
                event_logo: req.body.event_logo,
                event_wall_pic: req.body.event_wall_pic,
                event_link: req.body.event_link,
                event_disc: req.body.event_disc,
                event_social_links: req.body.event_social_links,
                prizes: req.body.prizes,
                judges: req.body.judges,
                sponsors: req.body.sponsors,
                timeline: req.body.timeline,
                teams: req.body.teams,
                announcemts: req.body.announcemts
            }
        ))
    }
    catch (err) {
        res.status(500).json(err)
    }
})

//delete event
router.delete('/delevent', async (req, res) => {
    try {
        const event = await EventData.findOne({ event_name: req.body.event_name });
        res.status(500).json(await event.deleteOne())
    }
    catch (err) {
        res.status(500).json(err)
    }
})

//add an announcment
router.patch('/newannouncement', async (req, res) => {
    try {
        const event = await EventData.findOne({ event_name: req.body.event_name });
        //send email to all the participants.
        res.status(500).json(await event.updateOne({ $push: { announcemts: req.body.announcemts } }));
    }
    catch (err) {
        res.status(500).json(err)
    }
})

//get all teams of an event

//get team info

//get all submissions

//get a submission


module.exports = router;