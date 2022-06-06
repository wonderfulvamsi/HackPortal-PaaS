const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    wallet_id: { type: String, required: true },
    user_name: { type: String },
    institute: { type: String },
    mobileno: { type: Number },
    email: { type: String },
    linkedin_url: { type: String },
    github_url: { type: String },
    bio: { type: String },
    events: { type: Array }
}
);

const UserData = mongoose.model('UserData', userSchema)

module.exports = UserData;