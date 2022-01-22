import React from "react";
import "./App.css";
import { Typography } from "antd";
import { Link } from "react-router-dom";
import Header from "./components/Header";
import DatesTable from "./components/DatesTable";
import Balance from "./components/Balance";

function App() {
  return (
    <div className="App">
      <Header />
      <Balance />
      <div className="main">
        {/* <DatesTable /> */}
      </div>

      <div className="footer">
        <Typography.Title
          level={5}
          style={{ color: "white", textAlign: "center" }}
        >
          <Link to="/">Crypto</Link> <br />
        </Typography.Title>
      </div>
    </div>
  );
}

export default App;
