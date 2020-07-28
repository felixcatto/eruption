import React from 'react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import TodoList from './TodoList';
import { todoListReducer, filterStateReducer } from './todolistSlice';

const store = configureStore({
  reducer: {
    todoList: todoListReducer,
    filterState: filterStateReducer,
  },
});

const ReduxToolkitApp = () => (
  <Provider store={store}>
    <TodoList />
  </Provider>
);

export default ReduxToolkitApp;
