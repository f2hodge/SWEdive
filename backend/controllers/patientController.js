const asyncHandler = require('express-async-handler');

const Patient = require('../models/patientModel');

// @desc Get patient info
// @route GET /api/patients
// @access Private
const getPatients = asyncHandler(async (req,res) => {
    const patient = await Patient.find({ user: req.user.id });

    res.status(200).json(patient);
});

// @desc Get single patient info
// @route GET /api/patients
// @access Private
const getPatient = asyncHandler(async (req,res) => {
    const patient = await Patient.findById(req.params.id);

    // Make sure the patient exists
    if(!patient) {
        res.status(400)
        throw new Error('Patient not found')
    };

    res.status(200).json(patient);
});

// @desc Intake Patient
// @route POST /api/patients
// @access Private
const intakePatient = asyncHandler(async (req, res) => {

    // Take in the requested fields from the body
    const { 
        patientId,
        age,
        height,
        weight,
        bmi,
        race,
        covidTestPositive,
        icuAdmit,
        icuVisits,
        mortality } = req.body;

    // Check that all fields are completed
    if(!patientId ||
        !age ||
        !height ||
        !weight ||
        !bmi ||
        !race ||
        !covidTestPositive ||
        !icuAdmit ||
        !icuVisits ||
        !mortality) {
        res.status(400);
        throw new Error('Please add all fields')
    };

    // Check if a patient exists
    const patientExists = await Patient.findOne({patientId});

    if(patientExists) {
        res.status(400);
        throw new Error('Patient already exists');
    };

    // Create Patient
    const patient = await Patient.create({
        patientId,
        age,
        height,
        weight,
        bmi,
        race,
        covidTestPositive,
        icuAdmit,
        icuVisits,
        mortality,
    });

    // Check that patient was created
    if(patient) {
        res.status(201).json(
            {
            _id: patient.id,
            patientId,
            age,
            height,
            weight,
            bmi,
            race,
            covidTestPositive,
            icuAdmit,
            icuVisits,
            mortality,
            }
        );
    } else {
        res.status(400);
        throw new Error('Invalid patient data');
    };
});

// @desc Update patient
// @route PUT /api/patients/:id
// @access Private
const updatePatient = asyncHandler(async (req,res) => {
    const patient = await Patient.findById(req.params.id);

    // Make sure the patient exists
    if(!patient) {
        res.status(400)
        throw new Error('Patient not found')
    };

    // Update the patient and send as a response
    const updatedPatient = await Patient.findByIdAndUpdate(
        req.params.id,
        req.body, {
        new: true,
        }
    );

    res.status(200).json(updatedPatient);
});

// @desc Delete patient
// @route DELETE /api/patients/:id
// @access Private
const deletePatient = asyncHandler(async (req,res) => {
    const patient = await Patient.findById(req.params.id);

    if(!patient) {
        res.status(400)
        throw new Error('Patient not found')
    }

    await patient.remove();

    res.status(200).json({ id: req.params.id });
});

module.exports = {
    getPatients,
    getPatient,
    intakePatient,
    updatePatient,
    deletePatient,
}