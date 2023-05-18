import React, { useState,useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import { Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { API_URL,API_GET_URL, API_POST_URL } from "../constants";
import axios from "axios";
const Feedback = () => {
  const [advice, setAdvice] = useState('');
  const [improvement, setImprovement] = useState('');
  const [comments, setComments] = useState('');
  const [resultDict, setresultDict] = useState({});
  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission, e.g., send data to server or perform desired actions
    console.log(advice, improvement, comments);
    console.log(resultDict);
    resultData()
    navigate('/thankyou');
    localStorage.setItem('tabChangeCount', 0);
  };

  async function resultData() {
    try {
      const response = await axios.post(API_POST_URL, resultDict);
      console.log(response.data);   
    } catch (error) {
      console.error(error);
    }
  }


  useEffect(() => {
    console.log('feedback');
    console.log(resultDict);
  }, [resultDict]);


  useEffect(() => {
    const storedData = localStorage.getItem('results');
    const tabcount = localStorage.getItem('tabChangeCount');
    const timecount = localStorage.getItem('time');
    const data = storedData ? JSON.parse(storedData) : null;
    const tabc = tabcount ? JSON.parse(tabcount) : null;
    const timec = timecount ? JSON.parse(tabcount) : null;
    // localStorage.setItem('tabChangeCount', 0);
    console.log('in feedback');
    console.log(timecount)
    console.log(timec)
    console.log(data);
    setresultDict((prevresultDict) => ({
      ...prevresultDict,
      ['data']: data
    }));
    setresultDict((prevresultDict) => ({
      ...prevresultDict,
      ['tabcount']: tabc
    }));
    setresultDict((prevresultDict) => ({
      ...prevresultDict,
      ['advice']: advice
    }));
    setresultDict((prevresultDict) => ({
      ...prevresultDict,
      ['feedback']: improvement
    }));
    setresultDict((prevresultDict) => ({
      ...prevresultDict,
      ['comments']: comments
    }));
    setresultDict((prevresultDict) => ({
      ...prevresultDict,
      ['time']: timecount
    }));

    //localStorage.setItem('tabChangeCount', 0);
  }, [advice,improvement,comments]);

  return (
    <form onSubmit={handleSubmit}>
    <Stack sx={{width:'100%', alignItems:'center', justifyContent:"center"}}>
    <div className='headline' style={{display:'flex',background:'#800000', width:'100%',alignItems:'center',justifyContent:'center', alignContent:'center', height:'80px'}}>
          <h1 style={{color:'#FFF',fontFamily:'monospace'}}>Headlines</h1>
        </div>
      <h3 style={{margin:'10px'}}>Feedback</h3>
      <Stack sx={{width:'100%', alignItems:'center', justifyContent:"center", margin:'10px',padding:'20px'}}>
        <label htmlFor="advice">Advice for new writers to make headlines better:</label>
        <textarea style={{width:'100%'}}
          id="advice"
          value={advice}
          onChange={(e) => setAdvice(e.target.value)}
          required
        />
      </Stack>
      <Stack sx={{width:'100%', alignItems:'center', justifyContent:"center", margin:'10px',padding:'20px'}}>
        <label htmlFor="improvement">Things to avoid that make headlines worse:</label>
        <textarea style={{width:'100%'}}
          id="improvement"
          value={improvement}
          onChange={(e) => setImprovement(e.target.value)}
          required
        />
      </Stack>
      <Stack sx={{width:'100%', alignItems:'center', justifyContent:"center", margin:'10px',padding:'20px'}}>
        <label htmlFor="comments">Additional comments or questions:</label>
        <textarea style={{width:'100%'}}
          id="comments"
          value={comments}
          onChange={(e) => setComments(e.target.value)}
        />
      </Stack>
      <Button style={{background:'#3B71CA'}} type="submit">SUBMIT</Button>
      </Stack>
    </form>
  );
};

export default Feedback;
