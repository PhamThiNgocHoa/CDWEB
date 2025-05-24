import React from "react";
import Router from "./routes/Router";
import {useAuth} from "./hooks/useAuth";

function App() {
    useAuth();
    return (
        <div>
            <Router/>
        </div>
    );
}

export default App;
