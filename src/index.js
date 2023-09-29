import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import './LanguageSelector/LanguageSelector.css';
import LanguageSelector from './LanguageSelector/LanguageSelector.js';

import CalculatorApp from './Calculator/CalculatorApp.js';
import CALCULATOR_APP_HOOK from './Calculator/CalculatorApp_Hook.js';

import {Hoc1, Hoc2} from './HocTest/Hoc.js';
import {HocComponent1, HocComponent2} from './HocTest/HocComponent.js';

import {IntModifier, SimpleDisplay, SimpleDisplay2} from './IntModifier/IntModifierComponents.js';

import {ErrorBoundary} from './ErrorBoundary/ErrorBoundary.js';
import {ErrorBoundaryChild} from './ErrorBoundary/ErrorBoundaryChild.js';

import MathExam from './MathExam/MathExam.js';

import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <Router>
    <Switch>

      <Route path="/LanguageSelector">
        <LanguageSelector />
      </Route>

      <Route path="/CalculatorApp">
          <CalculatorApp />
        </Route>

        <Route path="/CalculatorApp_Hook">
          <CALCULATOR_APP_HOOK />
        </Route>

      <Route path="/Hoc">
        <p>Button Type 1 will not update when clicked.</p>
        <HocComponent1 />
        <p>Button Type 2 will update when clicked.</p>
        <HocComponent2 />
        <p>Button Type 1 is wrapped up in a Higher Order Component, automatically updates.</p>
        <Hoc1 />
        <p>Button Type 2 inside a Higher Order Component updates same as before.</p>
        <Hoc2 />
        </Route>

        <Route path="/IntModifier">
          <IntModifier render={v => <SimpleDisplay value={v} />} />
          <IntModifier render={v => <SimpleDisplay2 value={v} />} />
        </Route>

        <Route path="/ErrorBoundary">
          <ErrorBoundary>
            <ErrorBoundaryChild />
            </ErrorBoundary>
        </Route>

        <Route path="/MathExam">
          <MathExam />
        </Route>

    </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
