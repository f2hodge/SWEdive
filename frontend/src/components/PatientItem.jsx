import React from 'react';
import { useDispatch } from 'react-redux';
import { deletePatient } from '../features/patients/patientSlice';

function PatientItem({ patient }) {
    const dispatch = useDispatch();

  return (
    <div className="patient" style={{display: "inline-block"}}>
        <div>
            {new Date(patient.createdAt).toLocaleString('en-US')}
        </div>
        <h2>
            {patient.patientId}
        </h2>
        <h3>
            ;
        </h3>
        <button 
            onClick={() => dispatch(deletePatient(patient._id))} 
            className="close">
                X
        </button>
    </div>
  )
}

export default PatientItem