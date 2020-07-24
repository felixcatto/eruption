import { uniqueId } from 'lodash';
import { getTodos, filterStates, todoListStates, makeActions } from '../lib/utils';

export const actions = makeActions([
  'todoList/addNewTodo',
  'todoList/changeTodoStatus',
  'todoListState/loadTodosRequest',
  'todoListState/loadTodosSuccess',
  'filterState/changeFilter',
]);

export const todoList = store => {
  store.on('@init', () => ({ todoList: [] }));
  store.on(actions.addNewTodo, (state, text) => ({
    todoList: state.todoList.concat({
      id: uniqueId(),
      text,
      isCompleted: false,
    }),
  }));
  store.on(actions.changeTodoStatus, (state, todoId) => ({
    todoList: state.todoList.map(todo =>
      todo.id === todoId ? { ...todo, isCompleted: !todo.isCompleted } : todo
    ),
  }));
  store.on(actions.loadTodosSuccess, (state, items) => ({
    todoList: items,
  }));
};

export const todoListState = store => {
  store.on('@init', () => ({ todoListState: todoListStates.idle }));
  store.on(actions.loadTodosRequest, () => ({ todoListState: todoListStates.loading }));
  store.on(actions.loadTodosSuccess, () => ({ todoListState: todoListStates.success }));
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
