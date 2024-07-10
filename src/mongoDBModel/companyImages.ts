const mongoose = require('mongoose');

const schema = new mongoose.Schema({ data: String }, { collection: "companyImages" });
export const companyImage = mongoose.model('companyImages', schema);


