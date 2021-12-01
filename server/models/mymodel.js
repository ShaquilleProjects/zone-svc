const mongoose = require('mongoose');
const { Schema } = mongoose;

const myModelSchema = new Schema({
    property1: String,
    property2: { type: String, default: undefined },
    property3: { type: Number, default: undefined },
    property4: {type: Date, default: Date.now},   
});

mongoose.model('mymodel', myModelSchema);