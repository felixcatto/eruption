import React from 'react';
import { NavLink } from '../lib/utils';
import routes from '../lib/routes';

const Crossroad = ({ children }) => {
  return (
    <div>
      <div className="d-flex justify-content-between mb-20">
        <NavLink to={routes.reactStateContext.old} activeClassName="app__nav-link_active">
          Old
        </NavLink>
        <NavLink to={routes.reactStateContext.new} activeClassName="app__nav-link_active">
          New (2 components)
        </NavLink>
        <NavLink to={routes.reactStateContext.storeon} activeClassName="app__nav-link_active">
          Storeon (2 components)
        </NavLink>
        <NavLink to={routes.reactStateContext.hook} activeClassName="app__nav-link_active">
          Generic hook (2 components)
        </NavLink>
      </div>
      <div>{children}</div>
    </div>
  );
};

export default Crossroad;
