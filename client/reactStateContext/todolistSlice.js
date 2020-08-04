import { uniqueId } from 'lodash';
import { filterStates, asyncStates } from '../lib/utils';
import api from '../lib/api';

export const todoList = {
  todoList: {
    data: [],
    status: asyncStates.idle,
    errors: null,
  },
};

export const filterState = { filterState: filterStates.all };

export const actions = {
  loadTodos: setContextState => async ms => {
    setContextState(i => {
      i.todoList.data = [];
      i.todoList.status = asyncStates.pending;
      i.todoList.errors = null;
    });
    const items = await api.todos.get(ms);
    setContextState(i => {
      i.todoList.data = items;
      i.todoList.status = asyncStates.resolved;
      i.todoList.errors = null;
    });
  },

  changeTodoStatus: setContextState => id =>
    setContextState(i => {
      const todo = i.todoList.data.find(el => el.id === id);
      todo.isCompleted = !todo.isCompleted;
    }),

  addNewTodo: setContextState => text =>
    setContextState(i => {
      i.todoList.data.push({
        id: uniqueId(),
        text,
        isCompleted: false,
      });
    }),

  changeFilter: setContextState => filterButtonState =>
    setContextState({ filterState: filterButtonState }),
};
