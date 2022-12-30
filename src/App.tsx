import React from "react";
import { Provider } from "react-redux";
import "./App.css";
import NavBar from "./Components/Header/Header";
import Routes from "./Routes/Index";
import { store } from "./store";

const App = () => {
  return (
    <Provider store={store}>
      <NavBar />
      <Routes />
    </Provider>
  );
};

export default App;
