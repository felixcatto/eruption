import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createSelector } from '@reduxjs/toolkit';
import { loadTodos, addNewTodo, changeTodoStatus, changeFilter } from './todolistSlice';
import CommonTodoList from '../components/CommonTodoList';

const todoListSelector = createSelector(
  state => state.todoList,
  state => state.todoListState,
  state => state.filterState,
  (todoList, todoListState, filterState) => ({ todoList, todoListState, filterState })
);

const TodoList = () => {
  const { filterState, todoListState, todoList } = useSelector(todoListSelector);
  const dispatch = useDispatch();
  const bindDispatch = actionCreator => payload => dispatch(actionCreator(payload));
  console.log({ todoList, todoListState, filterState });

  return (
    <CommonTodoList
      filterState={filterState}
      todoListState={todoListState}
      todoList={todoList}
      loadTodos={bindDispatch(loadTodos)}
      changeFilter={bindDispatch(changeFilter)}
      changeTodoStatus={bindDispatch(changeTodoStatus)}
      addNewTodo={bindDispatch(addNewTodo)}
    />
  );
};

export default React.memo(TodoList);
