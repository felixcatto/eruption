import React from 'react';
import { Provider } from 'react-redux';
import TodoListContainer from './TodoListContainer';
import { store } from './reduxDump';

const ReduxApp = () => (
  <Provider store={store}>
    <TodoListContainer />
  </Provider>
);

export default ReduxApp;
