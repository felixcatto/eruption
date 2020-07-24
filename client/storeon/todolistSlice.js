import { uniqueId } from 'lodash';
import { getTodos, filterStates, todoListStates } from '../lib/utils';

export const todoList = store => {
  store.on('@init', () => ({ todoList: [] }));
  store.on('todoList/addNewTodo', (state, text) => ({
    todoList: state.todoList.concat({
      id: uniqueId(),
      text,
      isCompleted: false,
    }),
  }));
  store.on('todoList/changeTodoStatus', (state, todoId) => ({
    todoList: state.todoList.map(todo =>
      todo.id === todoId ? { ...todo, isCompleted: !todo.isCompleted } : todo
    ),
  }));
  store.on('todoListState/loadTodosSuccess', (state, items) => ({
    todoList: items,
  }));
};

export const todoListState = store => {
  store.on('@init', () => ({ todoListState: todoListStates.idle }));
  store.on('todoListState/loadTodosRequest', () => ({ todoListState: todoListStates.loading }));
  store.on('todoListState/loadTodosSuccess', () => ({ todoListState: todoListStates.success }));
};

export const filterState = store => {
  store.on('@init', () => ({ filterState: filterStates.all }));
  store.on('filterState/changeFilter', (state, newFilterState) => ({
    filterState: newFilterState,
  }));
};

export const loadTodos = ms => async dispatch => {
  dispatch('todoListState/loadTodosRequest');
  const items = await getTodos(ms);
  dispatch('todoListState/loadTodosSuccess', items);
};
