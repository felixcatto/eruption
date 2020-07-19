import React from 'react';
import { render } from 'react-dom';
import ReactStateInline from './reactStateInline/TodoList';
import './index.scss';
import { BrowserRouter as Router, Switch, Route, Link, NavLink } from 'react-router-dom';
import routes from './lib/routes';

const App = props => {
  return (
    <Router>
      <div className="container app__container pt-20">
        <h1 className="mb-20">
          <Link to={routes.root} className="app__root-link">
            ToDo list App
          </Link>
        </h1>

        <div className="d-flex justify-content-between mb-20">
          <NavLink to={routes.reactStateInline} activeClassName="app__nav-link_active">
            React State Inline
          </NavLink>
          <NavLink to={routes.reactStateContext} activeClassName="app__nav-link_active">
            React State Context
          </NavLink>
          <NavLink to={routes.redux} activeClassName="app__nav-link_active">
            Redux
          </NavLink>
          <NavLink to={routes.reduxToolkit} activeClassName="app__nav-link_active">
            Redux Toolkit
          </NavLink>
          <NavLink to={routes.storeon} activeClassName="app__nav-link_active">
            Storeon
          </NavLink>
          <NavLink to={routes.reatom} activeClassName="app__nav-link_active">
            Reatom
          </NavLink>
          <NavLink to={routes.effector} activeClassName="app__nav-link_active">
            Effector
          </NavLink>
        </div>

        <Switch>
          <Route path={routes.reactStateInline}>
            <ReactStateInline />
          </Route>
          <Route path={routes.reactStateContext}>
            <div>To be done</div>
          </Route>
          <Route path={routes.redux}>
            <div>To be done</div>
          </Route>
          <Route path={routes.reduxToolkit}>
            <div>To be done</div>
          </Route>
          <Route path={routes.storeon}>
            <div>To be done</div>
          </Route>
          <Route path={routes.reatom}>
            <div>To be done</div>
          </Route>
          <Route path={routes.effector}>
            <div>To be done</div>
          </Route>
          <Route path={routes.root}>
            <img src="/img/v2.jpg" className="app__splash-screen" />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

render(<App />, document.getElementById('root'));
