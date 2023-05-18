import React, { useState,useEffect } from 'react';
import { Stack, FormControl, FormControlLabel, Radio, RadioGroup, Button } from '@mui/material';
import { useNavigate,useLocation } from 'react-router-dom';
import { useParams } from 'react-router-dom';

const Consent = () => {
  // const { search } = props.location;
  // const params = new URLSearchParams(search);
  // const paramValue = params.get('prolificID')
  // const { paramValue } = useParams();
  // const par = params.get('prolificID')
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const prolificid = searchParams.get('PROLIFIC_PID');
  const studyid = searchParams.get('STUDY_ID');
  const [selectedOption, setSelectedOption] = useState('');
  const navigate = useNavigate();
  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };
  useEffect(() => {
    console.log('in consent');
    console.log(prolificid,studyid);
    localStorage.setItem('prolificid', prolificid);
    localStorage.setItem('studyid', studyid);
  }, []);
  const handleSubmit = () => {
    if (selectedOption === 'agree') {
      // Handle logic when the user agrees
      navigate(`/instructions?PROLIFIC_PID=${prolificid}&STUDY_ID=${studyid}`)
      //navigate('/instructions', { state: { prolificid:prolificid,studyid:studyid } });
    } else if (selectedOption === 'disagree') {
      // Handle logic when the user disagrees
      navigate('/exit');
    }
  };
    
  return (
    <div>
        <Stack direction='column' sx={{width:'100%', alignItems:'center', justifyContent:"center"}}>
        <div className='headline' style={{display:'flex',background:'#800000', width:'100%',alignItems:'center',justifyContent:'center', alignContent:'center', height:'80px'}}>
          <h1 style={{color:'#FFF',fontFamily:'sans-serif'}}>Headlines</h1>
        </div>
        <Stack direction='column' sx={{width:'100%', alignItems:'center', justifyContent:"center",margin:'10px',padding:'20px',fontFamily:'sans-serif'}}>
            <Stack direction='column' sx={{width:'100%', alignItems:'center', justifyContent:"center",marginTop:'0px',padding:'20px'}}>
                    <h4>
                    Consent Form
                    </h4>
                    <h4>
                    THE UNIVERSITY OF CHICAGO
                    </h4>
                    <h4>
                    Booth School of Business
                    </h4>
            </Stack>
            <Stack direction='column' sx={{width:'100%',margin:'10px',padding:'30px'}}>
                    <span>
                    Principal Investigator: Prof. Sendhil Mullainathan
                    </span>
                    <span>
                    Student Researcher: Rafael Batista
                    </span>
                    <span>
                    IRB Study Number: IRB22-1611
                    </span>
                    <span>
                    We are researchers at the University of Chicago Booth School of Business. This form has important information about the reason for doing this study, what we will ask you to do if you decide to be in this study, and the way we would like to use information if you choose to be in the study.
                    </span>
                    <span>
                    <b>Why are you doing this study?</b>
                    </span>
                    <span>
                    You are being asked to participate in a research study about everyday decisions; specifically, it explores choices you make and the process by which you reach decisions.
                    </span>
                    <span>
                    <b>What will I do if I choose to be in this study?</b>
                    </span>
                    <span>
                     You will be asked to read a set of headlines and answer some questions about them.
                    </span>
                    <span>
                    <b>How long will this take?</b> 
                    </span>
                    <span>
                    Study participation will take anywhere from approximately 2-15 minutes. The study description that was posted lists a more specific estimate.
                    </span>
                    <span>
                    <b>What are the possible risks or discomforts?</b>
                    </span>
                    <span>
To the best of our knowledge, the things you will be doing have no more risk of harm than you would experience in your day-to-day. You have the right to withdraw your consent or discontinue participation at any time for any reason. Your decision to withdraw will not involve any penalty or loss of benefits to which you are entitled.
As with all research, there is a chance that confidentiality of the information we collect from you could be breached – we will take steps to minimize this risk, as discussed in more detail below in this form.
                    </span>
                    <span>
                    <b>What are the possible benefits for me or others?</b>
                    </span>
                    <span>
                    The potential benefit of the study is a better scientific understanding of the psychological underpinnings that govern understanding of decision making. Besides this, you are not likely to have any direct benefit from being in this research study. This study is designed to learn more about people’s ways of thinking.
                    </span>
                    <span>
                    <b>How much will I be compensated?</b>
                    </span>
                    <span>
                    You will receive the amount listed on study description which is approximately US$12 / hour. Your participation is purely voluntary and even if you decide to discontinue the study, you will be compensated for your time.
                    </span>
                    <span>
                    <b>How will you protect the information you collect about me, and how will that information be shared?</b>
                    </span>
                    <span>
                    To secure the confidentiality of your responses, your name and other identifying information will never be attached to your answers. To ensure the confidentiality of your participation in this study, your consent on this form will be linked to your online ID and never to your name or other identifying information. Your online ID (e.g. Prolific ID) may be used to distribute payment to you. To minimize the risks to confidentiality, we will store our survey responses in secure servers. All data collected will be analyzed in aggregate form.
                    </span>
                    <span>
                    We may share the data we collect from you for use in future research studies or with other researchers or online platforms (e.g., OSF, GitHub) – if we share the data that we collect about you, we will remove any information that could identify you before we share it.
                    </span>
                    <span>
                    <b>Who can I contact if I have questions or concerns about this research study?</b>
                    </span>
                    <span>
                    If you have questions, you are free to ask them now. If you have questions later, you may contact the researchers at Rafael Batista (rbatista@uchicago.edu).
                    </span>
                    <span>
                    If you have any questions about your rights as a participant in this research, you can contact the following office at the University of Chicago:
                    </span>
                    <span>
                    Social & Behavioral Sciences Institutional Review Board University of Chicago 1155 E. 60th Street, Room 418 Chicago, IL 60637 Phone: (773) 834-7835 Email: sbs-irb@uchicago.edu
                    </span>
                    <span>

                    </span>
                    <Stack direction='column' sx={{width:'100%'}}>
                        <FormControl component="fieldset">
                            <RadioGroup name="consentOption" value={selectedOption} onChange={handleOptionChange}>
                            <FormControlLabel value="agree" control={<Radio />} label="I AGREE to participate in this online research study and I have read and understood this consent form." />
                            <FormControlLabel value="disagree" control={<Radio />} label="I DO NOT agree, and therefore, will not be participating in this study." />
                            </RadioGroup>
                        </FormControl>

                        {/* Submit button */}
                        <Button variant="contained" onClick={handleSubmit} sx={{width:'10%'}}>Submit</Button>
                    </Stack>
            </Stack>
        </Stack>
        </Stack>
    </div>
  )
}

export default Consent