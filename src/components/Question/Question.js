import { useState } from "react";
import {useNavigate} from "react-router-dom"
import "./Question.css";
import Countdown from 'react-countdown';



const Question = ({
  currQues,
  setCurrQues,
  questions,
  options,
  correct,
  setScore,
  score
}) => {
  const [selected, setSelected] = useState();

  console.log(questions);

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

  };
  
  const handleNext = (currQues) => {
    if (currQues+1 == Object.keys(questions).length) {
      navigate("/result");
    } else  {
      setCurrQues(currQues + 1);
      setSelected();
    } 
  };


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
            key={Date.now() + 5000}
            date={Date.now() + 5000}
            renderer={renderer}
            autoStart={true}

              />}
        </span>
      
        <h2>{questions[currQues].question}</h2>
        <div className="options">
          {options &&
            options.map((i) => (
              <button
                className={`singleOption  ${selected && handleSelect(i)}`}
                key={i}
                onClick={() => {handleCheck(i, currQues)}}
                disabled={selected}>
                {i}
              </button>
            ))}
        </div>
        </div>
      </div>
  );
};

export default Question;