import React from 'react';
import ReactDOM from 'react-dom';

import CALCULATOR_APP_ACCESSIBLE_HOOK from './CalculatorAccessible/CalculatorAppAccessible_Hook';

import MathExam from './MathExam/MathExam.js';

ReactDOM.render(
  /*
  <React.StrictMode>
    
    <Router>
    <Switch>

      <Route path="/LanguageSelector">
        <LanguageSelector />
      </Route>

      <Route path="/CalculatorAppAccessible_Hook">
        <CALCULATOR_APP_ACCESSIBLE_HOOK />
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
          
      */
          <MathExam />
        /*
        </Route>

    </Switch>
    </Router>
  </React.StrictMode>*/,
  document.body
);

