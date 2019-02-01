import * as React from "react";
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';
import Navigation from '../Navigation';
import HomePage from '../Home';
import * as routes from '../../constants/routes';


import './index.css';

const App = () => 
  <Router>
    <div className="app">
      <Navigation>
        {children}
      </Navigation>
      <Route exact path={routes.HOME} component={() => <HomePage />} />
      <span>Found in <a href="https://roadtoreact.com/course-details?courseId=TAMING_THE_STATE">Taming the State in React</a></span> | <span>Star the <a href="https://github.com/rwieruch/react-firebase-authentication">Repository</a></span> | <span>Receive a <a href="https://www.getrevue.co/profile/rwieruch">Developer's Newsletter</a></span>
    </div>
  </Router>

export default App;