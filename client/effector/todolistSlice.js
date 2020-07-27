import { createStore, createEvent } from 'effector';
import { uniqueId } from 'lodash';
import { getTodos, filterStates, asyncStates } from '../lib/utils';

export const actions = {
  addNewTodo: createEvent(),
  changeTodoStatus: createEvent(),
  loadTodosRequest: createEvent(),
  loadTodosSuccess: createEvent(),
  changeFilter: createEvent(),
};

export const $todoList = createStore({
  data: [],
  status: asyncStates.idle,
  errors: null,
})
  .on(actions.addNewTodo, (state, text) => ({
    ...state,
    data: state.data.concat({
      id: uniqueId(),
      text,
      isCompleted: false,
    }),
  }))
  .on(actions.changeTodoStatus, (state, todoId) => ({
    ...state,
    data: state.data.map(todo =>
      todo.id === todoId ? { ...todo, isCompleted: !todo.isCompleted } : todo
    ),
  }))
  .on(actions.loadTodosRequest, () => ({
    data: [],
    status: asyncStates.pending,
    errors: null,
  }))
  .on(actions.loadTodosSuccess, (state, items) => ({
    data: items,
    status: asyncStates.resolved,
    errors: null,
  }));

export const $filterState = createStore(filterStates.all).on(
  actions.changeFilter,
  (state, newFilterState) => newFilterState
);

export const loadTodos = async ms => {
  actions.loadTodosRequest();
  const items = await getTodos(ms);
  actions.loadTodosSuccess(items);
};
