import React from 'react';
import {
  BrowserRouter as Router,
  Route,
} from "react-router-dom";
import Dashboard from './dashboard';
import Researcher from './researcher';
import WorkshopReview from './workshop';
const Webpages = () => {
    return(
        <Router>
            <Route exact path="/" component= {Dashboard} />
            <Route path = "/researcher" component = {Researcher} />
            <Route path = "/workshop" component = {WorkshopReview} />
        </Router>
    );
};
export default Webpages;
