import axios from "axios";

const API_URL = '/api/patients/';

// Intake new Patient
const intakePatient = async (patientData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };

    const response = await axios.post(API_URL, patientData, config);

    return response.data;
};

// Get all Patients
const getPatients = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };

    const response = await axios.get(API_URL, config);

    return response.data;
};

// Get one Patient
const getPatient = async (patientId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };

    const response = await axios.get(API_URL + patientId, config);

    return response.data;
};

// // Update Patient
// const updatePatient = async (patientData, token) => {
//     const config = {
//         headers: {
//             Authorization: `Bearer ${token}`
//         }
//     };

//     const response = await axios.put(API_URL, patientData, config);

//     return response.data;
// };

// Delete Patient
const deletePatient = async (patientId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };

    const response = await axios.delete(API_URL + patientId, config);

    return response.data;
};


const patientService = {
    intakePatient,
    getPatients,
    getPatient,
    // updatePatient,
    deletePatient,
};

export default patientService;