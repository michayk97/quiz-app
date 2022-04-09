import { CircularProgress } from "@material-ui/core";


const Loader = () => {
    return (
      <div>
       <CircularProgress
        style={{ margin: "auto" }}
        color="inherit"
        size={150}
        thickness={1}
      />
      </div>
    );
  };
  
  export default Loader;
  