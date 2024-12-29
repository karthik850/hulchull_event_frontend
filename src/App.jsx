import "./App.css";

import HomePage from "./Components/Homepage";
import Snowfall from "react-snowfall";
import { BrowserRouter as Router} from "react-router-dom";
import Footer from "./Components/Footer";

function App() {
  // example 1
  return (
    <>
      {/* <Snowfall
        // Changes the snowflake color
        color="red"
        // Applied to the canvas element
        style={{ background: "#fff" }}
        // Controls the number of snowflakes that are created (default 150)
        snowflakeCount={200}
      /> */}
      <Snowfall
        className="snowfall-section"
        color="white"
        style={{
          position: "fixed",
          width: "100vw",
          height: "100vh",
          zIndex: "1",
          opacity: "0.2",
        }}
        snowflakeCount={50}
      />
      <Router>
        <HomePage />
      </Router>
      <Footer />
    </>
  );
}

export default App;
