import * as React from "react";
import { render } from "react-dom";
import LoginPage from "./modules/login/login.page";

import "./styles.css";

function App() {
  return (
    <div className="App">
      <LoginPage />
    </div>
  );
}

const rootElement = document.getElementById("root");
render(<App />, rootElement);
