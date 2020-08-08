import React from 'react';
import { has } from 'lodash';
import { SSRContext } from '../lib/context';
import Context from './context';
import { actions, $todoList, $filterState } from './todolistSlice';
import TodoList from './TodoList';

const EffectorApp = () => {
  const initialState = React.useContext(SSRContext);
  const storeShape = {
    ...$todoList,
    ...$filterState,
  };

  const store = Object.keys(storeShape).reduce(
    (acc, storeKey) => {
      const effectorMakeFn = storeShape[storeKey];
      return {
        ...acc,
        [storeKey]: has(initialState, storeKey)
          ? effectorMakeFn(initialState[storeKey])
          : effectorMakeFn(),
      };
    },
    { actions }
  );

  return (
    <Context.Provider value={store}>
      <TodoList />
    </Context.Provider>
  );
};

export default EffectorApp;
