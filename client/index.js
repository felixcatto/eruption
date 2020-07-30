import React, { useState } from 'react';
import { render } from 'react-dom';
import { Router, Link } from '@reach/router';
import RSInline from './reactStateInline/TodoList';
import ReactStateContext from './reactStateContext/Crossroad';
import RSCOld from './reactStateContext/RSCOld';
import RSCNew from './reactStateContext/RSCNew';
import RSCStoreon from './reactStateContext/RSCStoreon';
import RSCHook from './reactStateContext/RSCHook';
import Redux from './redux/ReduxApp';
import ReduxToolkit from './reduxToolkit/ReduxToolkitApp';
import Storeon from './storeon/StoreonApp';
import Reatom from './reatom/ReatomApp';
import EFR from './effector/EffectorApp';
import MX from './mobx/MobxApp';
import './index.scss';
import routes from './lib/routes';
import { NavLink } from './lib/utils';

const Home = () => <img src="/img/v2.jpg" className="app__splash-screen" />;
const ReactStateInline = () => <RSInline />;
const Effector = () => <EFR />;
const Mobx = () => <MX />;

const App = () => {
  const [state, setState] = useState({ iprop: 0 });
  const { iprop } = state;
  const changeProp = () => setState({ iprop: Math.round(Math.random() * 100) });
  console.log(state);
  return (
    <div className="container app__container pt-20">
      <div className="d-flex justify-content-between align-items-center clickable mb-20">
        <h1>
          <Link to={routes.root} className="app__root-link">
            ToDo list App
          </Link>
        </h1>
        <div className="d-flex align-items-center">
          <div onClick={changeProp} className="mr-10">
            Click me
          </div>
          <i className="app__counter">{iprop}</i>
        </div>
      </div>

      <div className="d-flex justify-content-between mb-20">
        <NavLink to={routes.reactStateInline} activeClassName="app__nav-link_active">
          React State Inline
        </NavLink>
        <NavLink to={routes.reactStateContext.index} activeClassName="app__nav-link_active">
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
        <ReactStateContext path={routes.reactStateContext.index} />
        <RSCOld path={routes.reactStateContext.old} />
        <RSCNew path={routes.reactStateContext.new} />
        <RSCStoreon path={routes.reactStateContext.storeon} />
        <RSCHook path={routes.reactStateContext.hook} />
        <Redux path={routes.redux} />
        <ReduxToolkit path={routes.reduxToolkit} />
        <Storeon path={routes.storeon} />
        <Reatom path={routes.reatom} />
        <Effector path={routes.effector} />
        <Mobx path={routes.mobx} />
      </Router>
    </div>
  );
};

render(<App />, document.getElementById('root'));
