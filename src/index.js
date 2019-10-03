import React from "react";

import Routes from "./routes";
import { Provider } from "react-redux";
import Store from "./store";

console.disableYellowBox = true;

const App = () => (
    <Provider store={Store}>
        <Routes />
    </Provider>
);

export default App;