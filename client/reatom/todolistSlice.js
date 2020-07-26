import { uniqueId } from 'lodash';
import { declareAction, declareAtom } from '@reatom/core';
import { getTodos, filterStates, todoListStates } from '../lib/utils';

export const actions = {
  addNewTodo: declareAction('addNewTodo'),
  changeTodoStatus: declareAction('changeTodoStatus'),
  loadTodosRequest: declareAction('loadTodosRequest'),
  loadTodosSuccess: declareAction('loadTodosSuccess'),
  changeFilter: declareAction('changeFilter'),
};

export const todoListAtom = declareAtom([], on => [
  on(actions.addNewTodo, (state, text) =>
    state.concat({
      id: uniqueId(),
      text,
      isCompleted: false,
    })
  ),
  on(actions.changeTodoStatus, (state, todoId) =>
    state.map(todo => (todo.id === todoId ? { ...todo, isCompleted: !todo.isCompleted } : todo))
  ),
  on(actions.loadTodosSuccess, (state, items) => items),
]);

export const todoListStateAtom = declareAtom(todoListStates.idle, on => [
  on(actions.loadTodosRequest, () => todoListStates.loading),
  on(actions.loadTodosSuccess, () => todoListStates.success),
]);

export const filterStateAtom = declareAtom(filterStates.all, on => [
  on(actions.changeFilter, (state, newFilterState) => newFilterState),
]);

actions.loadTodos = declareAction(async (ms, { dispatch }) => {
  dispatch(actions.loadTodosRequest());
  const items = await getTodos(ms);
  dispatch(actions.loadTodosSuccess(items));
});
