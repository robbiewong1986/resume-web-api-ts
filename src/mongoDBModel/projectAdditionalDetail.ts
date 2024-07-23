const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    description: String,
    teamSize: Number,
    referenceLink: [String],
    projectImages: [String],
    duty: String
}, { collection: "projectAdditionalDetails" });

export const projectAdditionalDetails = mongoose.model('projectAdditionalDetails', schema);



