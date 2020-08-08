import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createSelector } from '@reduxjs/toolkit';
import { actions } from './todolistSlice';
import CommonTodoList from '../components/CommonTodoList';

const todoListSelector = createSelector(
  state => state.todoList,
  state => state.filterState,
  (todoList, filterState) => ({ todoList, filterState })
);

const TodoList = () => {
  const { filterState, todoList } = useSelector(todoListSelector);
  const dispatch = useDispatch();
  console.log({ todoList, filterState });

  return (
    <CommonTodoList
      filterState={filterState}
      todoListState={todoList.status}
      todoList={todoList.data}
      loadTodos={payload => dispatch(actions.loadTodos(payload))}
      changeFilter={payload => dispatch(actions.changeFilter(payload))}
      changeTodoStatus={payload => dispatch(actions.changeTodoStatus(payload))}
      addNewTodo={payload => dispatch(actions.addNewTodo(payload))}
    />
  );
};

export default TodoList;
