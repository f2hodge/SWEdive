import React from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function ExamDetail() {
  const navigate = useNavigate();

  const { user } = useSelector( (state) => state.auth );

  useEffect(() => {
    if(!user) {
      navigate('/login')
    }
  });

  return (
    <div>Exam Detail</div>
  )
}

export default ExamDetail