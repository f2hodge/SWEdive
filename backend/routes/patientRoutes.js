const express = require('express');
const router = express.Router();
const {
    getPatient,
    intakePatient,
    updatePatient,
    deletePatient,
} = require('../controllers/patientController');

const {protect} = require('../middleware/authMiddleware');

// This replaces the next 2 commented out lines, consolidating code.
router.route('/').get(protect, getPatient).post(protect, intakePatient);
// router.get('/', getPatient);
// router.post('/', intakePatient);

// This replaces the next 2 commented out lines, consolidating code.
router.route('/:id').put(protect, updatePatient).delete(protect, deletePatient);
// router.put('/:id', updatePatient);
// router.delete('/:id', deletePatient);

module.exports = router;