const mongoose = require('mongoose');

const patientSchema = mongoose.Schema({
    patientId: {
        type: String,
        required: [true, 'Please add an ID'],
        unique: true,
    },
    age: {
        type: Number,
        required: [true, 'Please add an age']
    },
    height: {
        type: String,
        required: [true, 'Please add height'],
    },
    weight: {
        type: Number,
        required: [true, 'Please add weight']
    },
    bmi: {
        type: Number,
        required: [true, 'Please add a BMI']
    },
    race: {
        type: String,
        required: [true, 'Please add race'],
    },
    covidTestPositive: {
        type: Boolean,
        required: [true, 'Please add COVIT status']
    },
    icuAdmit: {
        type: Boolean,
        required: [true, 'Were they admitted to the ICU'],
    },
    icuVisits: {
        type: Number,
        required: [true, 'How many times have they been to the ICU']
    },
    mortality: {
        type: Boolean,
        required: [true, 'Please note mortality'],
    },
    }, {
        timestamps: true,
    }
);

module.exports = mongoose.model('Patient', patientSchema);