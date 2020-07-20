import React from 'react';
import { render } from 'react-dom';
import { Router, Link } from '@reach/router';
import ReactStateInline from './reactStateInline/TodoList';
import './index.scss';
import routes from './lib/routes';
import { NavLink } from './lib/utils';

const Home = () => <img src="/img/v2.jpg" className="app__splash-screen" />;
const Stab = () => <div>To be done</div>;

const App = () => (
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
      <NavLink to={routes.mobx} activeClassName="app__nav-link_active">
        MobX
      </NavLink>
    </div>

    <Router>
      <Home path={routes.root} />
      <ReactStateInline path={routes.reactStateInline} />
      <Stab path={routes.reactStateContext} />
      <Stab path={routes.redux} />
      <Stab path={routes.reduxToolkit} />
      <Stab path={routes.storeon} />
      <Stab path={routes.reatom} />
      <Stab path={routes.effector} />
      <Stab path={routes.mobx} />
    </Router>
  </div>
);

render(<App />, document.getElementById('root'));
