import React from "react";
import { Routes, Route } from "react-router-dom";

import routes from "./core/router";

import "antd/dist/antd.min.css";
import "src/assets/styles/index.scss";

function App() {
  return (
    <div className="App">
      <Routes>
        {routes.map((item, index) => {
          return (
            <Route
              key={index}
              path={item.path}
              exact={item.exact}
              element={item.element}
            />
          );
        })}
      </Routes>
    </div>
  );
}

export default App;
