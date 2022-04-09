import { useState } from "react";
import {useNavigate} from "react-router-dom"
import "./Question.css";
import Countdown from 'react-countdown';
import React from 'react';

const url = 'https://script.google.com/macros/s/AKfycbyzZgsQmkx11Iok2Z0gpZsPydmC4tRpb4cMJIYS7E_NdRFzY8yU04qaC_LN-9GIKNLGyg/exec'

const sendData = (name, score, cb) => {
  console.log('name', name);
  let date = new Date()
  const dataForm = new FormData()
  dataForm.append('date', date.getFullYear()+'/'+(date.getMonth()+1)+'/'+date.getDate())
  dataForm.append('name', name)
  dataForm.append('scores', 10000)
  fetch(url,{
    method:"POST",
    body: dataForm
  }).then(cb)
}

let maxHelp = 1;
const Question = ({
  currQues,
  setCurrQues,
  questions,
  options,
  correct,
  setScore,
  name,
  score,
  setTable,
  table
}) => {
  const [selected, setSelected] = useState();


  const navigate = useNavigate();

  const handleSelect = (i) => {
    if (selected === i && selected === correct) return "select";
    else if (selected === i && selected !== correct) return "wrong";
    else if (i === correct) return "select";
  };

  const handleCheck = (i, currQues, isTimerOver) => {
    setTimeout(()=>{
      handleNext(currQues)
    },500);
    setSelected(i);
    if (i === correct && isTimerOver!==true){
      if(questions[currQues].difficulty==="easy") setScore(score + 1);
      else if(questions[currQues].difficulty==="medium") setScore(score + 2);
      else if(questions[currQues].difficulty==="hard") setScore(score + 3);

    } 

    function addCurrGame (name, table) {
      let date = new Date()
      let obj = {wha:date.getFullYear()+'/'+(date.getMonth()+1)+'/'+date.getDate(), name:name, score : 10000}
      table.push(obj)
      return table
    }


  };

  // function addCurrGame (name, table) {
  //   let date = new Date()
  //   let obj = {wha:date.getFullYear()+'/'+(date.getMonth()+1)+'/'+date.getDate(), name:name, score : 10000}
  //   table.push(obj)
  //   return table
  // }


  const handleNext = (currQues, fetchTable) => {
 
    if (currQues+1 === Object.keys(questions).length) {
      // setTable(addCurrGame(name, table))
      // TODO send result to spreadsheet
      sendData(name, score, () => navigate("/result"))
      console.log(1);
      
      // fetch(result).then(() => navigate("/result"))
      
    } else  {
      setCurrQues(currQues + 1);
      setSelected();
    } 
  };


  const handleHelp50 = (currQues)=>{
    
    let options = Array.from(document.querySelectorAll(".singleOption"))
    if(options.length ===2 ||maxHelp===0){
      return}
    maxHelp--
    let random
    let counter = 0
    let deselect = []
    while(counter<2){
      random = Math.floor(Math.random() * 3) + 1
      if(questions[currQues].correct_answer !== options[random].innerText &&
        !deselect.includes(random)){
        deselect.push(random)
        counter ++
      }
    }

    for (let index = 0; index < 2; index++) {
      options[deselect[index]].disabled="true"
    }

    setSelected()
  }


  const renderer = ({seconds, completed }) => {
    if (completed) {
        let istimerOver = true
        handleCheck(questions[currQues].correct_answer, currQues, istimerOver)
        
        
      return;
    } else {
      // Render a countdown
      return (
        <span>
          {seconds}
        </span>
      );
    }
  };

  return (
    <div className="question">
      <h1>Question {currQues + 1} :</h1>
      <div className="singleQuestion">
        <span>
          Time to answe:
          {<Countdown
            key={Date.now() + 100000}
            date={Date.now() + 100000}
            renderer={renderer}
            autoStart={true}

              />}
        </span>
      
        <h2>{questions[currQues].question}</h2>
        
        <div className="options" >
          {options &&
            options.map((i) => (
              <button
                className={`singleOption  ${selected && handleSelect(i)}`}
                key={i}
                onClick={() => {handleCheck(i, currQues)}}
                disabled={selected}>
                {i}
              </button>
            )
            )}
              <button className="helpOption" type="image" 
                onClick={() => {handleHelp50(currQues, options)}}>
                50:50 <br></br> You have {maxHelp} life lines left
              </button>

        </div>
        </div>
      </div>
  );
};

export default Question;