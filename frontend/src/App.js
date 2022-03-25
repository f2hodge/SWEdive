import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import PatientIntake from './pages/PatientIntake';
// import PatientDetail from './pages/PatientDetail.jsx';
// import LogExam from './pages/LogExam.jsx';
// import ExamDetail from './pages/ExamDetail';

function App() {
  return (
    <>
      <Router>
        <div className="container">
          <Header />
          <Routes>
            <Route path='/' element={<Dashboard />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/intakepatient' element={<PatientIntake />} />
            {/* <Route path='/patientview' element={<PatientDetail />} />
            <Route path='/logexam' element={<LogExam />} />
            <Route path='/examview' element={<ExamDetail />} /> */}
          </Routes>
        </div>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
