import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import AppLayout from '../layout/Layout';
import routes from '../../config/routes';
import 'antd/dist/antd.css';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <Route path={routes.root} component={AppLayout} />
        </Router>
      </div>
    );
  }
}

export default App;
