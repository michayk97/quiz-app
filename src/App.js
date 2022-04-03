import "./App.css";
import Header from './components/Header/Header'
import Home from './Pages/Home/Home';
import Quiz from './Pages/Quiz/Quiz';
import Results from './Pages/Results/Results';
import { useState } from 'react';


import { Footer } from "./components/Footer/Footer";
import { BrowserRouter, Route, Routes } from 'react-router-dom'

function App() {
  const [name, setName] = useState("")
  return (
    <BrowserRouter>
      <div className="app" style={{backgroundImage: "url(./grey.png)"}}>
        <Header/>

        <Routes>
          <Route exact path="/" element={<Home name={name} setName={setName}/>}/>
          <Route exact path="/quiz" element={<Quiz/>}/>
          <Route exact path="/results" element={<Results/>}/>
        </Routes>



      </div>
      <Footer/>
      </BrowserRouter>
  );
}

export default App;
