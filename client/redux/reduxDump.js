import { uniqueId } from 'lodash';
import { getTodos, filterStates, asyncStates } from '../lib/utils';

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
export const todoListReducer = (
  state = { data: [], status: asyncStates.idle, errors: null },
  action
) => {
  switch (action.type) {
    case 'TODO_ADD':
      return {
        ...state,
        data: [
          ...state.data,
          {
            id: uniqueId(),
            text: action.text,
            isCompleted: false,
          },
        ],
      };
    case 'TODO_CHANGE_STATUS':
      return {
        ...state,
        data: state.data.map(todo =>
          todo.id === action.id ? { ...todo, isCompleted: !todo.isCompleted } : todo
        ),
      };
    case 'TODOS_LOAD_REQUEST':
      return {
        data: [],
        status: asyncStates.pending,
        errors: null,
      };
    case 'TODOS_LOAD_SUCCESS':
      return {
        data: action.todoList,
        status: asyncStates.resolved,
        errors: null,
      };
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
