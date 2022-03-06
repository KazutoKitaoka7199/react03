import "./App.css";
import React from 'react';
import Feed from './components/Feed';
import { BrowserRouter, Route } from "react-router-dom";
import Login from './components/Login';

export default function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <>
          <Route exact path="/" component={Feed} />
          <Route exact path="/login" component={Login} />
        </>
      </BrowserRouter>
    </div>
  );
};
