import { uniqueId } from 'lodash';
import { getTodos, filterStates, asyncStates, makeActions, makeImmerFn } from '../lib/utils';

export const actions = makeActions([
  'todoList/addNewTodo',
  'todoList/changeTodoStatus',
  'todoList/loadTodosRequest',
  'todoList/loadTodosSuccess',
  'filterState/changeFilter',
]);

export const todoList = store => {
  store.on('@init', () => ({
    todoList: {
      data: [],
      status: asyncStates.idle,
      errors: null,
    },
  }));

  store.on(
    actions.addNewTodo,
    makeImmerFn((state, text) => {
      state.todoList.data.push({
        id: uniqueId(),
        text,
        isCompleted: false,
      });
    })
  );

  store.on(
    actions.changeTodoStatus,
    makeImmerFn((state, todoId) => {
      const todo = state.todoList.data.find(el => el.id === todoId);
      if (todo) {
        todo.isCompleted = !todo.isCompleted;
      }
    })
  );

  store.on(actions.loadTodosRequest, () => ({
    todoList: {
      data: [],
      status: asyncStates.pending,
      errors: null,
    },
  }));

  store.on(actions.loadTodosSuccess, (state, items) => ({
    todoList: {
      data: items,
      status: asyncStates.resolved,
      errors: null,
    },
  }));
};

export const filterState = store => {
  store.on('@init', () => ({ filterState: filterStates.all }));
  store.on(actions.changeFilter, (state, newFilterState) => ({
    filterState: newFilterState,
  }));
};

export const loadTodos = ms => async dispatch => {
  dispatch(actions.loadTodosRequest);
  const items = await getTodos(ms);
  dispatch(actions.loadTodosSuccess, items);
};
