const mongoose = require('mongoose');

const examSchema = mongoose.Schema({
    patientId: {
        type: String,
        required: true,
        ref: 'Patient'
    },
    testName: {
        type: String,
        required: [true, 'Please add a test name']
    },
    hoursSinceDiagnosis: {
        type: Number,
        required: [true, 'Please note Hours since Diagnosis']
    },
    imageLink: {
        type: String,
        required: [true, 'Please add a link to image']
    },
    // Can't figure out how to do Brixia
    // brixia: {
    //     type: Number,
    //     required: [true, 'Please add Brixia score']
    // }
    findings: {
        type: String,
        required: [true, 'Please add findings']
    },
}, {
        timestamps: true
});

module.exports = mongoose.model('Exam', examSchema);