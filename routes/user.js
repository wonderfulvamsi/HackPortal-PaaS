const router = require('express').Router();

let UserData = require('../models/userModel');

let EventData = require('../models/eventModel');

let TeamData = require('../models/teamModel');

let SubmissionData = require('../models/submissionModel');

require('dotenv').config();

//get all users on the platform
router.get('/allusers', async (req, res) => {
    res.status(200).json(await UserData.find())
})

//get user info
router.get('/userinfo', async (req, res) => {
    res.status(200).json(await UserData.findOne({ wallet_id: req.body.wallet_id }))
})

//register
router.post('/register', async (req, res) => {
    try {
        const newuser = new UserData({
            wallet_id: req.body.wallet_id,
            user_name: req.body.user_name,
            institute: req.body.institute,
            mobileno: req.body.mobileno,
            email: req.body.email,
            linkedin_url: req.body.linkedin_url,
            github_url: req.body.github_url,
            bio: req.body.bio,
            events: req.body.events,
        });

        res.status(500).json(await newuser.save())
    }
    catch (err) {
        res.status(500).json(err)
    }
})

//update user 
router.patch('/updateuser', async (req, res) => {
    try {
        const user = await UserData.findOne({ user_name: req.body.user_name });
        res.status(500).json(await user.updateOne({
            wallet_id: req.body.wallet_id,
            user_name: req.body.user_name,
            institute: req.body.institute,
            mobileno: req.body.mobileno,
            email: req.body.email,
            linkedin_url: req.body.linkedin_url,
            github_url: req.body.github_url,
            bio: req.body.bio,
            events: req.body.events,
        }));
    }
    catch (err) {
        res.status(500).json(err)
    }
})

//delete user
router.delete('/deluser', async (req, res) => {
    try {
        const user = await UserData.findOne({ wallet_id: req.body.wallet_id });
        res.status(500).json(await user.deleteOne())
    }
    catch (err) {
        res.status(500).json(err)
    }
})

//join an event
router.patch('/joinevent', async (req, res) => {
    try {
        const user = await UserData.findOne({ wallet_id: req.body.wallet_id });
        res.status(500).json(await user.updateOne({ $push: { events: req.body.event_name } }));
    }
    catch (err) {
        res.status(500).json(err)
    }
})

//create team
router.post('/createteam', async (req, res) => {
    try {
        const newteam = new TeamData({
            wallet_id: req.body.wallet_id,
            event_name: req.body.event_name,
            team_name: req.body.team_name,
            team_leader_wallet_id: req.body.team_leader_wallet_id,
            teammates_wallet_ids: req.body.teammates_wallet_ids,
            team_logo: req.body.team_logo,
            team_code: Math.floor(100000 + Math.random() * 900000)
        });
        res.status(500).json(await newteam.save())
    }
    catch (err) {
        res.status(500).json(err)
    }
})

//join a team
router.patch('/jointeam', async (req, res) => {
    try {

        const team = await TeamData.findOne({ team_name: req.body.team_name });
        const curr_user = await UserData.findOne({ wallet_id: req.body.wallet_id });
        const curr_event = await EventData.findOne({ event_name: req.body.event_name });
        //check the code
        if (team.team_code == req.body.team_code) {
            //check if already in some other team
            //check if curr user is team leader if yes then make the 2nd teammate team lead and exit
            //update team
            res.status(500).json(await team.updateOne({ $push: { teammates_wallet_ids: req.body.wallet_id } }))
        }
        else {
            res.status(500).send("Incorrect Team Code!")
        }

    }
    catch (err) {
        res.status(500).json(err)
    }
})

//add a submission

//vote && comment for a submission


module.exports = router;