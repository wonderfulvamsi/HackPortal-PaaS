const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const submissionSchema = new Schema({
    event_name: { type: String, required: true, unique: true },
    team_name: { type: String, required: true, unique: true },
    team_leader_wallet_id: { type: String, required: true },
    teammates_wallet_ids: { type: Array, required: true },
    team_logo: { type: String },
    live_link: { type: String },
    repo_link: { type: String },
    video_link: { type: String },
    doc_link: { type: String },
    pics: { type: Array },
    comments: { type: Array },
    judge_coin: { type: Number },
    competitor_coin: { type: Number },
    people_coin: { type: Number }
}
);

const SubmissionData = mongoose.model('SubmissionData', submissionSchema)

module.exports = SubmissionData;