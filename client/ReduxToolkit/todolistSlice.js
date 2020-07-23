import { createSlice } from '@reduxjs/toolkit';
import { uniqueId } from 'lodash';
import { getTodos, filterStates, todoListStates } from '../lib/utils';

const todoListStateSlice = createSlice({
  name: 'todoListState',
  initialState: todoListStates.idle,
  reducers: {
    loadTodosRequest() {
      return todoListStates.loading;
    },
    loadTodosSuccess() {
      return todoListStates.success;
    },
  },
});

const todoListSlice = createSlice({
  name: 'todoList',
  initialState: [],
  reducers: {
    addNewTodo(state, { payload: text }) {
      state.push({
        id: uniqueId(),
        text,
        isCompleted: false,
      });
    },
    changeTodoStatus(state, { payload: todoId }) {
      const todo = state.find(el => el.id === todoId);
      if (todo) {
        todo.isCompleted = !todo.isCompleted;
      }
    },
  },
  extraReducers: {
    [todoListStateSlice.actions.loadTodosSuccess](state, { payload: todoList }) {
      return todoList;
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

export const { addNewTodo, changeTodoStatus } = todoListSlice.actions;
export const todoListReducer = todoListSlice.reducer;
export const { changeFilter } = filterStateSlice.actions;
export const filterStateReducer = filterStateSlice.reducer;
export const { loadTodosRequest, loadTodosSuccess } = todoListStateSlice.actions;
export const todoListStateReducer = todoListStateSlice.reducer;

export const loadTodos = ms => async dispatch => {
  dispatch(loadTodosRequest());
  const todoList = await getTodos(ms);
  dispatch(loadTodosSuccess(todoList));
};
