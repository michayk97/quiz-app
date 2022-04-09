import { Button} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { set_cptable } from "xlsx";
import Table from "../../components/Table/Table";
import "./Result.css";
import axios from 'axios';

const url = 'https://script.google.com/macros/s/AKfycbyzZgsQmkx11Iok2Z0gpZsPydmC4tRpb4cMJIYS7E_NdRFzY8yU04qaC_LN-9GIKNLGyg/exec'






const colNames = ["Date", "Name", "Score"]

const Result = (
  { lastScore }
  // { name, score, table, setTable}
  ) => {
  const [table, setTable] = useState([])
  const [loaded, setLoaded] = useState(false);

  // TODO state of table useState()
  //useMount
  useEffect(()=> {
    const url = 'https://gsx2json.com/api?id=1Ods-VtLk9CpM3wR2SwSZywLmJphAyrjUL7vsldFUvOE&sheet=test'
    axios.get(url).then((res) => {
      console.log(res);
      setTable(res.data.rows.sort((a, b) => parseFloat(b.scores) - parseFloat(a.scores)));
      setLoaded(true);
    }).catch(() => setTable([]));
  }, [setLoaded, setTable]);

  
  // table.sort((a, b) => parseFloat(b.scores) - parseFloat(a.scores))
      
  

    return !loaded ? <div> Loading... </div> : (
    <div className="result">
      <span className="title">Final Score : {lastScore}</span>
      {/* <Table list = {table} colNames={colNames}/> */}
      <Table list = {table} colNames={colNames}/>
      <Button
        variant="contained"
        color="secondary"
        size="large"
        style={{ alignSelf: "center", marginTop: 20 }}
        href="/"
      >
        Go to homepage
      </Button>
    </div>
  );
};

export default Result;