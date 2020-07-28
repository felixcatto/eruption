import React from 'react';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { todoListReducer, filterStateReducer } from './reduxDump';
import TodoListContainer from './TodoListContainer';

const store = createStore(
  combineReducers({
    todoList: todoListReducer,
    filterState: filterStateReducer,
  }),
  composeWithDevTools(applyMiddleware(thunkMiddleware, createLogger()))
);

const ReduxApp = () => (
  <Provider store={store}>
    <TodoListContainer />
  </Provider>
);

export default ReduxApp;
