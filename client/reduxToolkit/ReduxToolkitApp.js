import React from 'react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { SSRContext } from '../lib/context';
import TodoList from './TodoList';
import { todoListReducer, filterStateReducer } from './todolistSlice';

const ReduxToolkitApp = () => {
  const initialState = React.useContext(SSRContext);
  const store = configureStore({
    reducer: {
      todoList: todoListReducer,
      filterState: filterStateReducer,
    },
    preloadedState: {
      todoList: initialState.todoList,
    },
  });

  return (
    <Provider store={store}>
      <TodoList />
    </Provider>
  );
};

export default ReduxToolkitApp;
