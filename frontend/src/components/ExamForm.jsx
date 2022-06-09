import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import{ intakePatient, reset } from '../features/patients/patientSlice';

function ExamForm() {
    const initialState = {
        patientId: "",
        testName: "",
        hoursSinceDiagnosis: "",
        imageLink: "",
        findings: "",
    };

    const [state, setState] = useState({ ...initialState });

    const clearState = () => {
        setState({...initialState})
    };

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleChange = (e) => {
        const value = (e.target.type === "checkbox" ? e.target.checked : e.target.value)
        setState({
            ...state,
            [e.target.name]: value,
        })
    };

    const onSubmit = e => {
        e.preventDefault();

        dispatch(logExam(state));

        clearState();

        navigate('/');
    };

    return <section className='form'>
        <form onSubmit={onSubmit}>
            <div className="form-group">
                <label htmlFor="text">Patient ID</label>
                <input 
                    placeholder="Enter Patient's ID"
                    type="text" 
                    name="patientId"
                    id="patientId"
                    value={state.patientId} 
                    onChange={handleChange}
                />
                <br />
                <label htmlFor="text">Test Name</label>
                <input 
                    placeholder="Enter Name of Test"
                    type="text" 
                    name="testName" 
                    id="testName"
                    value={state.testName} 
                    onChange={handleChange}
                />
                <br />
                <label htmlFor="text">ImageLink</label>
                <input 
                    placeholder="Enter Hours since Diagnosis"
                    type="number" 
                    name="hoursSinceDiagnosis" 
                    id="hoursSinceDiagnosis" 
                    value={state.hoursSinceDiagnosis} 
                    onChange={handleChange}
                />
                <br />
                <label htmlFor="text">Weight</label>
                <input 
                    placeholder='Enter weight in lbs'
                    type="number" 
                    name='weight'
                    id='weight' 
                    min="0"
                    value={state.weight} 
                    onChange={handleChange}
                />
                <br />
                <label htmlFor="text">BMI</label>
                <input 
                    placeholder='Enter BMI number'
                    type="number" 
                    name='bmi' 
                    id='bmi' 
                    value={state.bmi} 
                    onChange={handleChange}
                />
                <br />
                <label htmlFor="text">Select Patient Race of Identity</label>
                <select 
                    name='race' 
                    id='race' 
                    value={state.race} 
                    onChange={handleChange}
                >
                    <option hidden value="">Select</option>
                    <option value="WHITE">White</option>
                    <option value="BLACK OR AFRICAN AMERICAN">Black</option>
                    <option value="HISPANIC OR LATINX">Hispanic</option>
                    <option value="ASIAN">Asian</option>
                    <option value="NATIVE AMERICAN">Native American</option>
                    <option value="NATIVE HAWAIIAN OR OTHER PACIFIC ISLANDER">Pacific Islander</option>
                    <option value="OTHER">Other</option>
                </select>
                <br />
                <label htmlFor="text">COVID Test Positive</label>
                <input 
                    type="checkbox" 
                    name='covidTestPositive' 
                    id='covidTestPositive' 
                    value={state.covidTestPositive} 
                    onChange={handleChange}
                />
                <br />
                <label htmlFor="text">Admitted to ICU</label>
                <input 
                    type="checkbox" 
                    name='icuAdmit' 
                    id='icuAdmit' 
                    value={state.icuAdmit} 
                    onChange={handleChange}
                />
                <br />
                <label htmlFor="text">Number of ICU Visits</label>
                <input 
                    placeholder='Enter number of visits to ICU'
                    type="number" 
                    name='icuVisits' 
                    id='icuVisits' 
                    min="0"
                    value={state.icuVisits} 
                    onChange={handleChange}
                />
                <br />
                <label htmlFor="text">Mortality</label>
                <input 
                    type="checkbox" 
                    name='mortality' 
                    id='mortality' 
                    value={state.mortality} 
                    onChange={handleChange}
                />
                <br /><br />
            </div>
            {/* <h5>Patient ID: {state.patientId}</h5>
            <h5>Age: {state.age}</h5>
            <h5>Sex assigned at Birth: {state.birthSex}</h5>
            <h5>Height: {state.height}</h5>
            <h5>Weight: {state.weight}</h5>
            <h5>BMI: {state.bmi}</h5>
            <h5>Race: {state.race}</h5>
            <h5>Are they COVID positive?: {state.covidTestPositive ? "Yes" : "No"}</h5>
            <h5>Were they admitted to the ICU?: {state.icuAdmit ? "Yes" : "No"}</h5>
            <h5>How many visits to the ICU?: {state.icuVisits}</h5>
            <h5>Mortality status?: {state.mortality ? "Deceased" : "Living"}</h5> */}
            <div className="form-group">
                <button className="btn btn-block" type='submit'>
                    Add Exam
                </button>
            </div>
        </form>
    </section>
}

export default ExamForm