const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const eventSchema = new Schema({
    event_name: { type: String, required: true, unique: true },
    event_logo: { type: String, required: true },
    event_wall_pic: { type: Array },
    event_link: { type: String },
    event_disc: { type: String },
    event_social_links: { type: Array },
    prizes: { type: Array },
    judges: { type: Array },
    sponsors: { type: Array },
    timeline: { type: Array, required: true },
    teams: { type: Array },
    announcemts: { type: Array }
}
);

const EventData = mongoose.model('EventData', eventSchema)

module.exports = EventData;