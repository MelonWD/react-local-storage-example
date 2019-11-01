// Import react dependencies
import * as React from "react";
import { render } from "react-dom";
// Import app dependencies
import LoginPage from "./modules/auth/login/login.page";
import "./styles.css";

/** Render app */
function App() {
  return (
    <div className="App">
      <LoginPage />
    </div>
  );
}

const rootElement = document.getElementById("root");
render(<App />, rootElement);
