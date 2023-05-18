import React from 'react'
import {useEffect } from 'react';
function Thankyou() {
  useEffect(() => {
    window.location.href = 'https://app.prolific.co/submissions/complete?cc=C15Z1LXR';
  }, []);
  return (
    <div>
      <div className='headline' style={{display:'flex',background:'#800000', width:'100%',alignItems:'center',justifyContent:'center', alignContent:'center', height:'80px'}}>
          <h1 style={{color:'#FFF',fontFamily:'sans-serif'}}>Headlines</h1>
      </div>
      <div style={{display:'flex',justifyContent:'center',alignItems:'center',height: '20vh' }}>
      Thankyou for participating in the survey!!
      </div>
    </div>
  )
}

export default Thankyou