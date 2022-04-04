import {useState } from "react"
import './Question.css'

const Questions = ({currQues,
  setCurrQues,
  questions,
  options,
  correct,
  setScore,
  score,
  setQuestions}) => {
  const [selected, setselected] = useState()

  const handleSelect = (i) =>{
    if(selected ===i && selected===correct){
      return "select"
    } 
    else if(selected===i && selected !==correct){
      return "wrong"
    }
    else if(i===correct){
      return "select"
    }
  }

  const handleCheck = (i)=>{
    setTimeout(function(){
      setCurrQues(currQues+1)
      setselected()
  }, 600);
  setselected(i)
    if(i===correct) setScore(score+1)
    

  }
  return (
    <div className="question">
      <h1> Question {currQues + 1} </h1>  
      <div className="singleQuestions">
        
        <h2>{questions[currQues].question}</h2>
        <div className="options">
          {
            options &&
              options.map(i =>(
                <button 
                  onClick={()=>handleCheck(i)}
                  className={`singleOption ${selected && handleSelect(i)}`}
                  key = {i}
                  disabled={selected}>
                  {i}
                  </button>
              ))
          }

        
        </div>
      </div>
    </div>
  )
}

export default Questions