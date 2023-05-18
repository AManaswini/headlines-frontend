import React, { useState, useEffect } from 'react';
import './Game.css';
import { BrowserRouter as Router,Routes, Route,useNavigate } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import axios from "axios";
import { Stack } from '@mui/material';
import { API_URL,API_GET_URL } from "../constants";
import { useLocation } from 'react-router-dom';
import { format } from 'date-fns'
function Game() {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const prolificid = searchParams.get('PROLIFIC_PID');
    const studyid = searchParams.get('STUDY_ID');
    const navigate = useNavigate();
    const [inputValue, setInputValue] = useState('');
    const [predictions, setPredictions] = useState([]);
    const [text,setText]=useState('');
    const [isTabActive, setIsTabActive] = useState(true);
    const [tabChangeCount, setTabChangeCount] = useState(0);
    const [attemptno, setattemptno] = useState(1);
    // const [count,setCount] =useState(0);
    const [Count,setCount] =useState(0);
    const [inputDict, setInputDict] = useState({});
    const [timer, setTimer] = useState(0);
    const [intervalId, setIntervalId] = useState(null);
    const [id,setid]= useState(0);
    const [seconds, setSeconds] = useState(0);
    const [totaltime,settotaltime]=useState([]);
    const [headlineno,setheadlineno] = useState(1);
    useEffect(() => {
      const intervalId = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds + 1);
      }, 1000);

      return () => {
        clearInterval(intervalId);
      };
    }, []);
    useEffect(() => {
      console.log('in game');
      setInputDict((prevInputDict) => ({
        ...prevInputDict,
        ['prolificid']: prolificid
      }));
      setInputDict((prevInputDict) => ({
        ...prevInputDict,
        ['studyid']: studyid
      }));
    }, []);
  
    useEffect(() => {
      const handleVisibilityChange = () => {
        if (document.hidden) {
          // User moved away from the tab or window
          setTabChangeCount((prevCount) => prevCount + 1);
          localStorage.setItem('tabChangeCount', tabChangeCount + 1);
        }
      };
  
      document.addEventListener('visibilitychange', handleVisibilityChange);
  
      return () => {
        document.removeEventListener('visibilitychange', handleVisibilityChange);
      };
    }, [tabChangeCount]);
  
    useEffect(() => {
      const storedTabChangeCount = localStorage.getItem('tabChangeCount');
      if (storedTabChangeCount) {
        setTabChangeCount(parseInt(storedTabChangeCount, 10));
      }
    }, []);
  
    useEffect(() => {
      const Count = localStorage.getItem('Count');
      if (Count){
        //9
        console.log('Count')
        console.log(Count)
        if (Count >= 9) {
          console.log('Count')
          console.log(Count)
          console.log(inputDict)
          localStorage.setItem('results', JSON.stringify(inputDict));
          console.log('final time array')
          console.log(totaltime)
          localStorage.setItem('time', totaltime);
          navigate(`/feedback`)
          localStorage.setItem('Count', 0);
  
          }
      }
     
    }, [Count]);
  
    useEffect(() => {
      const handleBeforeUnload = () => {
        setTabChangeCount(0);
        localStorage.removeItem('tabChangeCount');
      };
      window.addEventListener('beforeunload', handleBeforeUnload);
  
      return () => {
        window.removeEventListener('beforeunload', handleBeforeUnload);
      };
    }, []);
  
    async function fetchData() {
      try {
        setattemptno(1);
        // console.log(totaltime)
        settotaltime((prevtotaltime) => [...prevtotaltime, seconds]);
        console.log(totaltime)
        setSeconds(0);
        //console.log(seconds)
        const response = await axios.post(API_GET_URL, { task: '0' });
        console.log('response');
        console.log(response)
        console.log(response.data['output'])
        setText(response.data['output']);
        setid(response.data['id']);
      } catch (error) {
        console.log(error);
      }
    }
    
    useEffect(() => {
      fetchData();
      console.log('from here')
      // return () => {
      //   if (intervalId) {
      //     clearInterval(intervalId);
      //     setTimer(0);
      //   }
      // };
    }, []);
  
    const clearTableRows = () => {
      var table = document.getElementById("table-body");
      for(var i = table.rows.length - 1; i > 0; i--)
      {
          table.deleteRow(i);
      }
      
    };
  
    useEffect(() => {
      const table = document.getElementById('predictions-table');
      
      if (table) {
        // Clear existing rows
        
        clearTableRows();
       
        // Sort predictions array by score in descending order
        const sortedPredictions= predictions.sort((a, b) => b.Score - a.Score);
        sortedPredictions.forEach((prediction) => {
          const newRow = table.insertRow();
          // Create cells and set their values
          const headlineCell = newRow.insertCell();
          headlineCell.innerText = prediction.Headline;
    
          const scoreCell = newRow.insertCell();
          scoreCell.innerText = prediction.Score;
          if (prediction.Headline === inputValue) {
            newRow.classList.add('green-row');
          }
          setInputValue('');
          console.log('predictions.length:')
          console.log(predictions.length)
          //if (predictions.length == 4) {
          if (predictions.length == 4) {
            console.log('done');
            console.log('predictions.length:')
            console.log(predictions.length)
            setPredictions([])
            setCount((prevCount)=>prevCount+1) 
            localStorage.setItem('Count', Count + 1);
            console.log('====headlineno')
            console.log(headlineno)
            setheadlineno(prevHeadlineno => prevHeadlineno + 1);
            console.log('====headlineno')
            console.log(headlineno)
            fetchData();
            console.log('from there')
            clearTableRows();
          }
        });
      }
    }, [predictions]);
    
  
  
    const handleSubmit = async () => {
      try {
        setSeconds(0);
        setattemptno(prevAttemptNo => prevAttemptNo + 1);
        
        console.log(seconds) 
        if(inputValue==''){
          alert('Please enter a valid input')
          return
        }
        if (inputValue.length > 100) {
          alert("Your proposed headline is too long.Try to shorten it for good score!!");
        }
        const response = await axios.post(API_URL, { input: inputValue });
        console.log('===recalculating====')
        console.log(headlineno)
        console.log((headlineno - (headlineno -1)/2)- ((headlineno - (headlineno -1)/2)-1)/2)
        setInputDict((prevInputDict) => ({
          ...prevInputDict,
          [attemptno]: {
            ...(prevInputDict[attemptno] || {}),
            [id]: {
              ...(prevInputDict[attemptno]?.text || {}),
              headline: inputValue,
              score: response.data.Score,
              
              'headlineno':(headlineno - (headlineno -1)/2)- ((headlineno - (headlineno -1)/2)-1)/2,
              consistent: response.data.Consistent,
              'time':new Date().toLocaleString('en-US', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
              }),
              'attemptno':attemptno
              // Add additional properties here if needed
            }
          }
        }));
        
        const newPred = { Headline: response.data.Headline, Score: response.data.Score };
        //setPredictions([{ Headline: response.data.Headline, Score: response.data.Score }]);
        setPredictions((prevPredictions) => [...prevPredictions, newPred]);
        if(response.data.Consistent < 0.5){
          alert("You are moving off the topic.Try to be consistent to get a good score!!");
        }
      } catch (error) {
        console.log(error);
      }
    };
  
    return (
      
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div className='headline' style={{display:'flex',background:'#800000', width:'100%',alignItems:'center',justifyContent:'center', alignContent:'center', height:'80px'}}>
          <h1 style={{color:'#FFF',fontFamily:'sans-serif'}}>Headlines</h1>
        </div>
        <h4 style={{marginTop:"50px",fontFamily:'sans-serif'}}>Reframe the below headline to find your score</h4>
        <h2 style={{margin:"50px",fontFamily:'sans-serif'}}>{text}</h2>
        <Stack direction='row' sx={{width:'100%', alignItems:'center', justifyContent:"center", margin:'10px'}}>
          <input className='input'
            type="text"
            value={inputValue}
            onChange={(event) => setInputValue(event.target.value)}
            placeholder="Enter your proposed headline"
            required
          />
          <Button style={{marginLeft:'10px', top:'-10px', position:'relative',background:'#3B71CA'}} onClick={handleSubmit}>SUBMIT</Button>
        </Stack>
        <Table  striped bordered id = "predictions-table">
          <thead>
            <tr>
              <th>Headline</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody id='table-body'>
            <tr>
              <td></td>
              <td></td>  
            </tr>
          </tbody>
        </Table>
      
        {/* <span>Tab Change Count: {tabChangeCount}</span>
        <span>{seconds}</span> */}
      </div>
  
     
    );
  }
  
  export default Game;
  