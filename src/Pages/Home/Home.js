import { Button, TextField} from '@material-ui/core';
import './Home.css'
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage'
import { useState } from 'react';
import {useNavigate} from "react-router-dom"
import React from 'react';

const Home = ({name, setName, fetchQuestions, fetchTable}) => {
  const [error, setError] = useState(false)
  const navigate= useNavigate();

  const handleSubmit = ()=>{
    if(!name){
      setError(true)
      return;
    } 
    else{
      setError(false)
      fetchQuestions()
      fetchTable()
      navigate("/quiz")
    }
  }
  



  return (
    <div className='content'>
      <div className='settings'>
        <span style={{ fontSize:30 }}>Welcome to the - QUIZ</span>
        
      
        <div className='settings_select'>
          {error && <ErrorMessage>Please Fill all the fields</ErrorMessage>}
          <TextField
            style={{marginBottom:25}}
            label='Enter Your Name'
            variant='outlined'
            onChange={(e)=>setName(e.target.value)}
            />

          <Button
            variant='contained'
            color="primary"
            size="large"
            onClick={handleSubmit}
            >
            Start Quiz
          </Button>
        </div>
        
      </div>
      <img src='/quiz.svg' className='banner' alt="quiz img"/>
    </div>




  )
}

export default Home