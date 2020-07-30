import React from 'react';
import { NavLink } from '../../lib/utils';
import routes from '../../lib/routes';

const Crossroad = ({ className }) => (
    <div className={className}>
      <div className="d-flex justify-content-between">
        <NavLink to={routes.reactStateContext.index} activeClassName="app__nav-link_active">
          Main
        </NavLink>
        <NavLink to={routes.reactStateContext.storeon} activeClassName="app__nav-link_active">
          Storeon
        </NavLink>
        <NavLink to={routes.reactStateContext.hook} activeClassName="app__nav-link_active">
          Generic hook
        </NavLink>
        <NavLink to={routes.reactStateContext.connectCockpit} activeClassName="app__nav-link_active">
          Connect (Cockpit)
        </NavLink>
        <NavLink to={routes.reactStateContext.connectNew} activeClassName="app__nav-link_active">
          Connect (New)
        </NavLink>
      </div>
    </div>
);

export default Crossroad;
