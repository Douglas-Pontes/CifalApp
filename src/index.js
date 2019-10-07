import React from "react";

import Routes from "./routes";
import { Provider } from "react-redux";
import Store from "./store";
import FlashMessage from "react-native-flash-message";

console.disableYellowBox = true;

const App = () => (
    <Provider store={Store}>
        <Routes />
        <FlashMessage />
    </Provider>
);

export default App;