import React from 'react';
import { useStoreon } from 'storeon/react';
import CommonTodoList from '../components/CommonTodoList';
import { loadTodos, actions } from './todolistSlice';

const TodoList = () => {
  const { dispatch, todoList, filterState } = useStoreon('todoList', 'filterState');
  console.log({ todoList, filterState });

  return (
    <CommonTodoList
      filterState={filterState}
      todoListState={todoList.status}
      todoList={todoList.data}
      loadTodos={payload => loadTodos(payload)(dispatch)}
      changeFilter={payload => dispatch(actions.changeFilter, payload)}
      changeTodoStatus={payload => dispatch(actions.changeTodoStatus, payload)}
      addNewTodo={payload => dispatch(actions.addNewTodo, payload)}
    />
  );
};

export default React.memo(TodoList);
