import { uniqueId } from 'lodash';
import { getTodos, filterStates, todoListStates } from '../lib/utils';

// actions
export const addNewTodo = text => ({
  type: 'TODO_ADD',
  text,
});

export const changeTodoStatus = todoId => ({
  type: 'TODO_CHANGE_STATUS',
  id: todoId,
});

export const changeFilter = filterState => ({
  type: 'TODOS_SET_VISIBILITY',
  filterState,
});

export const loadTodos = ms => async dispatch => {
  dispatch({ type: 'TODOS_LOAD_REQUEST' });
  const todoList = await getTodos(ms);
  dispatch({ type: 'TODOS_LOAD_SUCCESS', todoList });
};

// reducers
export const todoListReducer = (state = [], action) => {
  switch (action.type) {
    case 'TODO_ADD':
      return [
        ...state,
        {
          id: uniqueId(),
          text: action.text,
          isCompleted: false,
        },
      ];
    case 'TODO_CHANGE_STATUS':
      return state.map(todo =>
        todo.id === action.id ? { ...todo, isCompleted: !todo.isCompleted } : todo
      );
    case 'TODOS_LOAD_SUCCESS':
      return action.todoList;
    default:
      return state;
  }
};

export const todoListStateReducer = (state = todoListStates.idle, action) => {
  switch (action.type) {
    case 'TODOS_LOAD_REQUEST':
      return todoListStates.loading;
    case 'TODOS_LOAD_SUCCESS':
      return todoListStates.success;
    default:
      return state;
  }
};

export const filterStateReducer = (state = filterStates.all, action) => {
  switch (action.type) {
    case 'TODOS_SET_VISIBILITY':
      return action.filterState;
    default:
      return state;
  }
};
