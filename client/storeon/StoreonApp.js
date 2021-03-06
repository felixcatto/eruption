import React from 'react';
import { createStoreon } from 'storeon';
import { StoreContext } from 'storeon/react';
// import { storeonDevtools } from 'storeon/devtools';
import TodoList from './TodoList';
import { todoList, filterState } from './todolistSlice';

const store = createStoreon([todoList, filterState/* , storeonDevtools */]);

const StoreonApp = () => (
  <StoreContext.Provider value={store}>
    <TodoList />
  </StoreContext.Provider>
);

export default StoreonApp;
