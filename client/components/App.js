import React from 'react';
import { Router, Link } from '@reach/router';
import ReactStateInline from '../reactStateInline/TodoList';
import RSCApp from '../reactStateContext/RSCApp';
import RSCStoreon from '../reactStateContext/other/RSCStoreon';
import RSCHook from '../reactStateContext/other/RSCHook';
import RSCConnectCockpit from '../reactStateContext/other/RSCConnectCockpit';
import RSCConnectNew from '../reactStateContext/other/RSCConnectNew';
import Redux from '../redux/ReduxApp';
import ReduxToolkit from '../reduxToolkit/ReduxToolkitApp';
import Storeon from '../storeon/StoreonApp';
import Reatom from '../reatom/ReatomApp';
import Effector from '../effector/EffectorApp';
import Mobx from '../mobx/MobxApp';
import './App.scss';
import routes from '../lib/routes';
import { NavLink, PartialNavLink } from '../lib/utils';

const Home = () => <img src="/img/v2.jpg" className="app__splash-screen" />;

const App = () => (
  <div className="container app__container pt-20">
    <div className="d-flex justify-content-between align-items-center clickable mb-20">
      <h1>
        <Link to={routes.root} className="app__root-link">
          ToDo list App
        </Link>
      </h1>
    </div>

    <div className="d-flex justify-content-between mb-20">
      <NavLink to={routes.reactStateInline} activeClassName="app__nav-link_active">
        React State Inline
      </NavLink>
      <PartialNavLink to={routes.reactStateContext.index} activeClassName="app__nav-link_active">
        React State Context
      </PartialNavLink>
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
      <RSCApp path={routes.reactStateContext.index} />
      <RSCStoreon path={routes.reactStateContext.storeon} />
      <RSCHook path={routes.reactStateContext.hook} />
      <RSCConnectCockpit path={routes.reactStateContext.connectCockpit} />
      <RSCConnectNew path={routes.reactStateContext.connectNew} />
      <Redux path={routes.redux} />
      <ReduxToolkit path={routes.reduxToolkit} />
      <Storeon path={routes.storeon} />
      <Reatom path={routes.reatom} />
      <Effector path={routes.effector} />
      <Mobx path={routes.mobx} />
    </Router>
  </div>
);

export default App;
