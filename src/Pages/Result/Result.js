import { Button } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import Table from "../../components/Table/Table";
import "./Result.css";
import axios from "axios";
import { CircularProgress } from "@material-ui/core";
import { Fireworks } from 'fireworks-js/dist/react'


const colNames = ["Date", "Name", "Score"];

const Result = ({ lastScore }) =>
  // { name, score, table, setTable}
  {
    const [table, setTable] = useState([]);
    const [loaded, setLoaded] = useState(false);

    // TODO state of table useState()
    //useMount
    useEffect(() => {
      const url =
        "https://gsx2json.com/api?id=1Ods-VtLk9CpM3wR2SwSZywLmJphAyrjUL7vsldFUvOE&sheet=quizgame";
      axios
        .get(url)
        .then((res) => {
          console.log(res);
          setTable(
            res.data.rows.sort(
              (a, b) => parseFloat(b.scores) - parseFloat(a.scores)
            )
          );
          setLoaded(true);
        })
        .catch(() => setTable([]));
    }, [setLoaded, setTable, loaded]);

    return loaded === false ? (
      <CircularProgress
        style={{ margin: "auto" }}
        color="inherit"
        size={150}
        thickness={1}
      />
    ) : (
      <div className="result">
        <span className="title-result">
          Your final Score is: {lastScore} 
        </span>
        
        <Table list={table} colNames={colNames} />
        
        <span>To be Honest, your score dosen't actualy matter, you got to this point and it's worth celebrating</span>
        <Fireworks/>
        <Button
          variant="contained"
          color="secondary"
          size="large"
          style={{ alignSelf: "center", marginTop: 20, position:"bottom" }}
          href="/"
        >
          Go to homepage
        </Button>
      </div>
    );
  };

export default Result;
