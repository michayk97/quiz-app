import "./App.css";
import Header from './components/Header/Header'
import Home from './Pages/Home/Home';
import Quiz from './Pages/Quiz/Quiz';
import Result from "./Pages/Result/Result";
import { useState } from 'react';
import { Footer } from "./components/Footer/Footer";
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import axios from "axios";


//fsdfsfsd
function App() {
  const [name, setName] = useState()
  const [questions, setQuestions] = useState()
  const [score, setScore] = useState(0)
  const [table, setTable] = useState()

  const fetchQuestions = async () =>{
    const {data} = await axios.get('https://opentdb.com/api.php?amount=5');
    setQuestions(data.results)
  } 

  const fetchTable = async () =>{
    const url = 'https://gsx2json.com/api?id=1Ods-VtLk9CpM3wR2SwSZywLmJphAyrjUL7vsldFUvOE&sheet=Sheet1'
    const {data} = await axios.get(url);
    setTable(data.rows)
  } 

  return (
    <BrowserRouter>
      <div className="app" style={{backgroundImage: "url(./grey.png)"}}>
        <Header/>

        <Routes>
          <Route exact path="/"
            element={<Home name={name}
            setName={setName}
            fetchQuestions={fetchQuestions}
            fetchTable={fetchTable}/>}
          />
          <Route exact path="/quiz"
            element={<Quiz
            name ={name}
            questions={questions}
            score = {score}
            setScore={setScore}
            setQuestions={setQuestions}
            />}
          />
          <Route exact path="/result"
            element={<Result
            score = {score}
            table={table}
            setTable ={setTable}
            />}
          />
        </Routes>



      </div>
      <Footer/>
      </BrowserRouter>
  );
}

export default App;
