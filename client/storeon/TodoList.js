import React from 'react';
import { useStoreon } from 'storeon/react';
import CommonTodoList from '../components/CommonTodoList';
import { loadTodos } from './todolistSlice';

const TodoList = () => {
  const { dispatch, todoList, todoListState, filterState } = useStoreon(
    'todoList',
    'todoListState',
    'filterState'
  );
  console.log({ todoList, todoListState, filterState });

  return (
    <CommonTodoList
      filterState={filterState}
      todoListState={todoListState}
      todoList={todoList}
      loadTodos={payload => loadTodos(payload)(dispatch)}
      changeFilter={payload => dispatch('filterState/changeFilter', payload)}
      changeTodoStatus={payload => dispatch('todoList/changeTodoStatus', payload)}
      addNewTodo={payload => dispatch('todoList/addNewTodo', payload)}
    />
  );
};

export default React.memo(TodoList);
