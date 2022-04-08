import { Button} from "@material-ui/core";
import Table from "../../components/Table/Table";
import "./Result.css";


const colNames = ["Date", "Name", "Score"]

const Result = ({ name, score, setTable, table}) => {
    return (
    <div className="result">
    
      <span className="title">Final Score : {score}</span>
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