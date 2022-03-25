import React from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
// import PatientForm from '../components/PatientForm';
import PatientItem from '../components/PatientItem';
import Spinner from '../components/Spinner';
import { getPatients, reset } from '../features/patients/patientSlice';

function Dashboard() {
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

    dispatch(getPatients());

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
        <h1>Welcome {user && user.name}</h1>
        <p>Patients Dashboard</p>
      </section>

      {/* <PatientForm /> */}

      <section className="content">
        { patients.length > 0 ? (
            <div className="patients">
              {patients.map((patient) => (
                <PatientItem key={patient._id} patient={patient} />
              ))}
            </div>
          ) : (
            <h3>No Patients to Display</h3>)}
      </section>
    </>
  )
}

export default Dashboard