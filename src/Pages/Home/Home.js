import { Button, TextField } from "@material-ui/core";
import "./Home.css";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import React from "react";

const Home = ({ name, setName, fetchQuestions, fetchTable }) => {
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (!name) {
      setError(true);
      return;
    } else {
      setError(false);
      fetchQuestions();
      fetchTable();
      navigate("/quiz");
    }
  };

  return (
    <div className="content">
      <div className="settings">
        <h1 style={{ margin: "10px" }}>siiiiiiWelcome to THE QUIZ</h1>
        <h3 style={{ margin: "10px" }}>This is how the game goes: </h3>
        <p style={{ margin: "10px" }}>
          You have 20 questions with 7 seconds for each question.
          <br></br> You have 4 lifelines, each one is a 50:50 lifeline, that can
          only be used in a multiple choice question<br></br>
        </p>
        <span style={{ fontSize: "30px", margin: "10px" }}>LET'S GOOOOO!!</span>
        <div className="settings_select">
          {error && <ErrorMessage>Please Fill all the fields</ErrorMessage>}
          <TextField
            style={{ marginBottom: 25 }}
            label="Enter Your Name"
            variant="outlined"
            onChange={(e) => setName(e.target.value)}
          />

          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={handleSubmit}
          >
            Start Quiz
          </Button>
        </div>
      </div>
      <img src="/quiz.svg" className="banner" alt="quiz img" />
    </div>
  );
};

export default Home;
