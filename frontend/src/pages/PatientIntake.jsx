import React from 'react'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { reset } from '../features/patients/patientSlice';
import Spinner from '../components/Spinner';
import PatientForm from '../components/PatientForm';

function PatientIntake() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector( (state) => state.auth );
  const { isLoading, isError, message } = useSelector((state) => state.patients)

  useEffect(() => {
    if(isError) {
      console.log(message);
    };

    if(!user) {
      navigate('/login')
    };

    return () => {
      dispatch(reset());
    }
  }, [user, navigate, isError, message, dispatch]);

  if(isLoading) {
    return <Spinner />
  };

  return (
    <>
      <section className="heading">
        <h1>Intake Patient</h1>
      </section>

      <PatientForm />
    </>
  )
}

export default PatientIntake