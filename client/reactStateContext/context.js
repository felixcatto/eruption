import React from 'react';
import { isFunction } from 'lodash';
import { useImmerState } from '../lib/utils';

export const Context = React.createContext();

export const Provider = ({ children, value }) => {
  const [contextState, setContextState] = useImmerState(value);

  return (
    <Context.Provider value={{ ...contextState, setContextState }}>{children}</Context.Provider>
  );
};

export const connect = mapStateToProps => Component => ownProps => {
  const { setContextState, ...state } = React.useContext(Context);
  const props = isFunction(mapStateToProps) ? mapStateToProps(state, ownProps) : {};

  if (props.actions) {
    const bindActions = actions =>
      Object.keys(actions).reduce(
        (acc, actionKey) => ({
          ...acc,
          [actionKey]: actions[actionKey](setContextState),
        }),
        {}
      );
    props.actions = React.useMemo(() => bindActions(props.actions), []);
  }

  const newProps = {
    ...props,
    ...ownProps,
    setContextState,
  };

  return React.useMemo(() => <Component {...newProps} />, Object.values(newProps));
};
