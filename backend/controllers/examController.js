const asyncHandler = require('express-async-handler');

const Exam = require('../models/examModel');
const Patient = require('../models/patientModel');

// @desc Get exams
// @route GET /api/exams
// @access Private
const getExam = asyncHandler(async (req,res) => {
    // Check if a patient matches
    const patientTest = req.body.patientId;
    if(!patientTest) {
        res.status(400);
        throw new Error('Please add a patient ID');
    };

    const patientExists = await Patient.findOne({patientTest});

    if(!patientExists) {
        res.status(400);
        throw new Error('Patient does not exist');
    }

    // Gather exams
    const exams = await Exam.find({ patientId: patientTest });

    res.status(200).json(exams);
});

// @desc Log exams
// @route POST /api/exams
// @access Private
const logExam = asyncHandler(async (req,res) => {

    // Take in the requested fields from the body
    const imageLinkPrefix = 'https://ohif-hack-diversity-covid.s3.amazonaws.com/covid-png/';

    const { 
        patientId,
        testName,
        hoursSinceDiagnosis,
        image,
        // brixia,
        findings, } = req.body;

    // Check that all fields are completed
    if(!patientId ||
        !testName ||
        !hoursSinceDiagnosis ||
        !image ||
        // !brixia ||
        !findings) {
        res.status(400);
        throw new Error('Please add all fields')
    };

    // Check if a patient exists
    const patientExists = await Patient.findOne({patientId});

    if(!patientExists) {
        res.status(400);
        throw new Error('Patient does not exist');
    };    

    // Create Exam
    const imageLink = imageLinkPrefix + image;

    const exam = await Exam.create({
        patientId,
        testName,
        hoursSinceDiagnosis,
        imageLink,
        // brixia,
        findings,
    });

    // Check that exam was created
    if(exam) {
        res.status(201).json(
            {
            _id: exam.id,
            patientId,
            testName,
            hoursSinceDiagnosis,
            imageLink,
            // brixia,
            findings,
            }
        );
    } else {
        res.status(400);
        throw new Error('Invalid exam data');
    };
});

// @desc Update exam
// @route PUT /api/exams/:id
// @access Private
const updateExam = asyncHandler(async (req,res) => {
    const exam = await Exam.findById(req.params.id);

    // Check that exam exists
    if(!exam) {
        res.status(400)
        throw new Error('Exam not found')
    };

    // Check if a patient matches
    const patientTest = req.body.patientId;
    if(!patientTest) {
        res.status(400);
        throw new Error('Please add a patient ID');
    };

    const patientExists = await Patient.findOne({patientTest});

    if(!patientExists) {
        res.status(400);
        throw new Error('Patient does not exist');
    }

    if(exam.patientId !== patientTest) {
        res.status(400);
        throw new Error('Patient does not match exam');
    }

    // Update the Exam and send as response
    const updatedExam = await Exam.findByIdAndUpdate(
        req.params.id,
        req.body, {
        new: true,
        }
    );

    res.status(200).json(updatedExam);
});

// @desc Delete exam
// @route DELETE /api/exams/:id
// @access Private
const deleteExam = asyncHandler(async (req,res) => {
    const exam = await Exam.findById(req.params.id);

    // Check that exam exists
    if(!exam) {
        res.status(400)
        throw new Error('Exam not found')
    };

    // Check if a patient matches
    const patientTest = req.body.patientId;
    if(!patientTest) {
        res.status(400);
        throw new Error('Please add a patient ID');
    };

    const patientExists = await Patient.findOne({patientTest});

    if(!patientExists) {
        res.status(400);
        throw new Error('Patient does not exist');
    }

    if(exam.patientId !== patientTest) {
        res.status(400);
        throw new Error('Patient does not match exam');
    }

    await exam.remove();

    res.status(200).json({ id: req.params.id });
});

module.exports = {
    getExam,
    logExam,
    updateExam,
    deleteExam
}