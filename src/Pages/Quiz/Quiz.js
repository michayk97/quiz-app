import { useEffect, useState } from "react";
import { CircularProgress } from "@material-ui/core";
import "./Quiz.css";
import Question from "../../components/Question/Question";
import React from "react";

const Quiz = ({ name, questions, score, setScore }) => {
  const [options, setOptions] = useState();
  const [currQues, setCurrQues] = useState(0);

  useEffect(() => {
    setOptions(
      questions &&
        handleShuffle([
          questions[currQues]?.correct_answer,
          ...questions[currQues]?.incorrect_answers,
        ])
    );
  }, [currQues, questions]);

  const handleShuffle = (options) => {
    return options.sort(() => Math.random() - 0.5);
  };

  return (
    <div className="quiz">
      <span className="subtitle"> Welcome, {name}</span>
      {questions ? (
        <>
          <div className="quizInfo">
            <span>
              Category: {questions[currQues].category}
              <br></br>
              Difficulty: {questions[currQues].difficulty}
            </span>
            <span></span>
            <span>Score: {score}</span>
          </div>
          <Question
            currQues={currQues}
            name={name}
            setCurrQues={setCurrQues}
            questions={questions}
            options={options}
            correct={questions[currQues]?.correct_answer}
            score={score}
            setScore={setScore}
          />
        </>
      ) : (
        <CircularProgress
          style={{ margin: 100 }}
          color="inherit"
          size={150}
          thickness={1}
        />
      )}
    </div>
  );
};

export default Quiz;
