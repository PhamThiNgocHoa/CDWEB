import React from "react";
import Router from "./routes/Router";
import {useCheckToken} from "./hooks/useCheckToken";

function App() {
    useCheckToken();
  return (
      <div>
        <Router />
      </div>
  );
}

export default App;
