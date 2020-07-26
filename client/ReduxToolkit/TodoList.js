import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createSelector } from '@reduxjs/toolkit';
import { loadTodos, addNewTodo, changeTodoStatus, changeFilter } from './todolistSlice';
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
      loadTodos={payload => dispatch(loadTodos(payload))}
      changeFilter={payload => dispatch(changeFilter(payload))}
      changeTodoStatus={payload => dispatch(changeTodoStatus(payload))}
      addNewTodo={payload => dispatch(addNewTodo(payload))}
    />
  );
};

export default React.memo(TodoList);
