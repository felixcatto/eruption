import React from 'react';
import { useStore } from 'effector-react';
import CommonTodoList from '../components/CommonTodoList';
import { actions, $todoList, $filterState, loadTodos } from './todolistSlice';

const TodoList = () => {
  const todoList = useStore($todoList);
  const filterState = useStore($filterState);
  console.log({ todoList, filterState });

  return (
    <CommonTodoList
      filterState={filterState}
      todoListState={todoList.status}
      todoList={todoList.data}
      loadTodos={loadTodos}
      changeFilter={actions.changeFilter}
      changeTodoStatus={actions.changeTodoStatus}
      addNewTodo={actions.addNewTodo}
    />
  );
};

export default React.memo(TodoList);
