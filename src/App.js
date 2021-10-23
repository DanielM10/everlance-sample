import logo from './logo.svg';
import './App.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Route } from "react-router-dom";
import Home from './Componentes/Home/Home'

const AppRouter = () => (
  <Router basename='/'>
    <Route path="/Home/" component={Home} />
  </Router>
  );
  
ReactDOM.render(
	<AppRouter />,
	document.getElementById('root')
);

export default AppRouter;
