const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const teamSchema = new Schema({
    event_name: { type: String, required: true },
    team_name: { type: String, required: true, unique: true },
    team_leader_wallet_id: { type: String, required: true },
    teammates_wallet_ids: { type: Array },
    team_logo: { type: String },
    team_code: { type: String }
}
);

const TeamData = mongoose.model('TeamData', teamSchema)

module.exports = TeamData;