import React from 'react';
import { useAction, useAtom } from '@reatom/react';
import CommonTodoList from '../components/CommonTodoList';
import { actions, todoListAtom, filterStateAtom } from './todolistSlice';

const TodoList = () => {
  const todoList = useAtom(todoListAtom);
  const filterState = useAtom(filterStateAtom);
  const addNewTodo = useAction(actions.addNewTodo);
  const changeTodoStatus = useAction(actions.changeTodoStatus);
  const changeFilter = useAction(actions.changeFilter);
  const loadTodos = useAction(actions.loadTodos);
  console.log({ todoList, filterState });

  return (
    <CommonTodoList
      filterState={filterState}
      todoListState={todoList.status}
      todoList={todoList.data}
      loadTodos={loadTodos}
      changeFilter={changeFilter}
      changeTodoStatus={changeTodoStatus}
      addNewTodo={addNewTodo}
    />
  );
};

export default React.memo(TodoList);
