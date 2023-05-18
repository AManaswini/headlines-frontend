import React,{ useState,useEffect } from 'react'
import { Stack, FormControl, FormControlLabel, Radio, RadioGroup, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import './Instructions.css'
const Instructions = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const prolificid = searchParams.get('PROLIFIC_PID');
  const studyid = searchParams.get('STUDY_ID');
  // const location = useLocation();
  // const { prolificid, studyid } = location;
  // const [prolificid, setprolificid] = useState('');
  const navigate = useNavigate();
  const handleSubmit = () => {
    navigate(`/game?PROLIFIC_PID=${prolificid}&STUDY_ID=${studyid}`)
  };
  useEffect(() => {
    console.log('in instructions');
    console.log(prolificid,studyid)
  }, []);
  return (
    <Stack sx={{width:'100%', alignItems:'center', justifyContent:"center"}}>
      <div className='headline' style={{display:'flex',background:'#800000', width:'100%',alignItems:'center',justifyContent:'center', alignContent:'center', height:'80px'}}>
          <h1 style={{color:'#FFF',fontFamily:'sans-serif'}}>Headlines</h1>
        </div>
      <h3 style={{margin:'10px'}}>Instructions</h3>
    
    <Stack direction='column' sx={{width:'100%',padding:'40px'}}>
        
        <span>
        Welcome to the Headline Improvement Tool, an online platform designed to help writers enhance their news headline-writing abilities!
        </span>
        <span>
        Your task is to write engaging headlines. There will be 7 rounds, each round consisting of 7 trials.
        </span>
        <span>
        You'll receive an 'Upworthy' headline: We'll provide you with a news headline from the well-known online news platform 'Upworthy' as your starting point.
        </span>
        <span>
        <b>Rewrite the headline:</b> Your goal is to rewrite the original headline to increase user engagement while preserving its core message and overall meaning. Feel free to rephrase and restructure, but ensure the main point of the story remains unchanged.
        </span>
        <span>
        <b>Evaluation & feedback:</b> Your headline will be assessed against all other headlines written. You'll receive a score from 1-100 to indicate where the headline you wrote stands relative to all other headlines. For example, a score of 50 means your headline is in the 50th percentile - it's better than 50% of all other headlines. In contrast, if you score 25, it means your headline is better than 25% of other headlines (but worse than ~75% of them). In addition to the score, we'll also offer constructive feedback if your headline is too lengthy or unrelated to the topic, guiding you towards better headline-writing practices.
        </span>
        <span>
        <b>Make use of your attempts:</b> You'll have 7 attempts to refine your headline. Simply type your new headline and press 'Enter'. No need to worry about capitalization – the input is case-insensitive.
        </span>
        <span>
        Be sure to try your best. In the end, you'll receive a bonus based on your performance. We will calculate your bonus by randomly selecting one of the seven rounds, as if drawing from a hat, then multiplying your highest score by $0.05. This means if your highest score in the selected round was 80, you'd earn 80 * $0.05 = $4.00 extra. If instead, your highest score in that round was 20, then you'd earn 20 * $0.05 = $1.00.
        </span>
        <span>After you finish, we will ask you some questions about your experience using the tool to write headlines. Good luck!</span>
    </Stack>
    <Button variant="contained" onClick={handleSubmit} sx={{width:'10%'}}>Continue</Button>

    </Stack>
  )
}

export default Instructions