import { createSlice } from '@reduxjs/toolkit';
import { uniqueId } from 'lodash';
import { filterStates, asyncStates } from '../lib/utils';
import api from '../lib/api';

const todoListSlice = createSlice({
  name: 'todoList',
  initialState: {
    data: [],
    status: asyncStates.idle,
    errors: null,
  },
  reducers: {
    addNewTodo(state, { payload: text }) {
      state.data.push({
        id: uniqueId(),
        text,
        isCompleted: false,
      });
    },
    changeTodoStatus(state, { payload: todoId }) {
      const todo = state.data.find(el => el.id === todoId);
      if (todo) {
        todo.isCompleted = !todo.isCompleted;
      }
    },
    loadTodosRequest(state) {
      state.data = [];
      state.status = asyncStates.pending;
      state.errors = null;
    },
    loadTodosSuccess(state, { payload: todoList }) {
      state.data = todoList;
      state.status = asyncStates.resolved;
      state.errors = null;
    },
  },
});

const filterStateSlice = createSlice({
  name: 'filterState',
  initialState: filterStates.all,
  reducers: {
    changeFilter(state, { payload: filterState }) {
      return filterState;
    },
  },
});

export const actions = {
  ...todoListSlice.actions,
  ...filterStateSlice.actions,
  loadTodos: ms => async dispatch => {
    const { loadTodosRequest, loadTodosSuccess } = todoListSlice.actions;
    dispatch(loadTodosRequest());
    const todoList = await api.todos.get(ms);
    dispatch(loadTodosSuccess(todoList));
  },
};
export const todoListReducer = todoListSlice.reducer;
export const filterStateReducer = filterStateSlice.reducer;
