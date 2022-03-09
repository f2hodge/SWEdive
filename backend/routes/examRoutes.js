const express = require('express');
const router = express.Router();
const {
    getExam,
    logExam,
    updateExam,
    deleteExam 
} = require('../controllers/examController');

const {protect} = require('../middleware/authMiddleware');

router.route('/').get(protect, getExam).post(protect, logExam);

router.route('/:id').put(protect, updateExam).delete(protect, deleteExam);

module.exports = router;