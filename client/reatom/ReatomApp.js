import React, { useEffect } from 'react';
import { createStore } from '@reatom/core';
import { context } from '@reatom/react';
import { connectReduxDevtools } from '@reatom/debug';
import TodoList from './TodoList';

const store = createStore();

const ReatomApp = () => {
  useEffect(() => connectReduxDevtools(store), []);

  return (
    <context.Provider value={store}>
      <TodoList />
    </context.Provider>
  );
};

export default ReatomApp;
