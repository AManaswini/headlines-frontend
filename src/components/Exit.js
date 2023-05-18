import React from 'react';
import { Button, Stack } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function Exit() {
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const prolificid = localStorage.getItem('prolificid');
    const studyid = localStorage.getItem('studyid');
    // Handle form submission, e.g., send data to server or perform desired actions
    navigate(`/?PROLIFIC_PID=${prolificid}&STUDY_ID=${studyid}`);
  };

  return (
    <Stack sx={{ alignItems: 'center', justifyContent: 'center' }}>
      <div
        className='headline'
        style={{
          display: 'flex',
          background: '#800000',
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          alignContent: 'center',
          height: '80px'
        }}
      >
        <h1 style={{ color: '#FFF', fontFamily: 'sans-serif' }}>Headlines</h1>
      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '20vh',
          marginLeft: '40px',
          marginRight:'40px'
        }}
      >
        We understand that you do not agree to the terms of the survey presented on the previous page and, therefore, have opted to not participate in this survey. We ask that you please return the survey so that we can collect responses from another participant. Thank you for your time.
      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '10%',
        }}
      >
        <Button onClick={handleSubmit}>BACK TO SURVEY</Button>
      </div>
    </Stack>
  );
}

export default Exit;
