import { createSlice } from '@reduxjs/toolkit';
import { uniqueId } from 'lodash';
import { getTodos, filterStates, asyncStates } from '../lib/utils';

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

export const {
  addNewTodo,
  changeTodoStatus,
  loadTodosRequest,
  loadTodosSuccess,
} = todoListSlice.actions;
export const todoListReducer = todoListSlice.reducer;
export const { changeFilter } = filterStateSlice.actions;
export const filterStateReducer = filterStateSlice.reducer;

export const loadTodos = ms => async dispatch => {
  dispatch(loadTodosRequest());
  const todoList = await getTodos(ms);
  dispatch(loadTodosSuccess(todoList));
};
