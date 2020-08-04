import { uniqueId } from 'lodash';
import { declareAction, declareAtom } from '@reatom/core';
import { filterStates, asyncStates } from '../lib/utils';
import api from '../lib/api';

export const actions = {
  addNewTodo: declareAction('addNewTodo'),
  changeTodoStatus: declareAction('changeTodoStatus'),
  loadTodosRequest: declareAction('loadTodosRequest'),
  loadTodosSuccess: declareAction('loadTodosSuccess'),
  changeFilter: declareAction('changeFilter'),
};

export const todoListAtom = declareAtom(
  {
    data: [],
    status: asyncStates.idle,
    errors: null,
  },
  on => [
    on(actions.addNewTodo, (state, text) => ({
      ...state,
      data: state.data.concat({
        id: uniqueId(),
        text,
        isCompleted: false,
      }),
    })),

    on(actions.changeTodoStatus, (state, todoId) => ({
      ...state,
      data: state.data.map(todo =>
        todo.id === todoId ? { ...todo, isCompleted: !todo.isCompleted } : todo
      ),
    })),

    on(actions.loadTodosRequest, () => ({
      data: [],
      status: asyncStates.pending,
      errors: null,
    })),

    on(actions.loadTodosSuccess, (state, items) => ({
      data: items,
      status: asyncStates.resolved,
      errors: null,
    })),
  ]
);

export const filterStateAtom = declareAtom(filterStates.all, on => [
  on(actions.changeFilter, (state, newFilterState) => newFilterState),
]);

actions.loadTodos = declareAction(async (ms, { dispatch }) => {
  dispatch(actions.loadTodosRequest());
  const items = await api.todos.get(ms);
  dispatch(actions.loadTodosSuccess(items));
});
