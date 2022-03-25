import React from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
// import PatientForm from '../components/PatientForm';
// import PatientItem from '../components/PatientItem';
import Spinner from '../components/Spinner';
import { getPatient, reset } from '../features/patients/patientSlice';


function PatientDetail() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
  
    const { user } = useSelector( (state) => state.auth );
    const { patients, isLoading, isError, message } = useSelector((state) => state.patients)
  
    useEffect(() => {
      if(isError) {
        console.log(message);
      };
  
      if(!user) {
        navigate('/login')
      };
  
      dispatch(getPatient());
  
      return () => {
        dispatch(reset());
      }
    }, [user, navigate, isError, message, dispatch]);
  
    if(isLoading) {
      return <Spinner />
    };
  return (
    <div>PatientDetail</div>
  )
}

export default PatientDetail