import React from 'react';
import { useAction, useAtom } from '@reatom/react';
import CommonTodoList from '../components/CommonTodoList';
import { actions, todoListAtom, filterStateAtom, todoListStateAtom } from './todolistSlice';

const TodoList = () => {
  const todoList = useAtom(todoListAtom);
  const filterState = useAtom(filterStateAtom);
  const todoListState = useAtom(todoListStateAtom);
  const addNewTodo = useAction(actions.addNewTodo);
  const changeTodoStatus = useAction(actions.changeTodoStatus);
  const changeFilter = useAction(actions.changeFilter);
  const loadTodos = useAction(actions.loadTodos);
  console.log({ todoList, todoListState, filterState });

  return (
    <CommonTodoList
      filterState={filterState}
      todoListState={todoListState}
      todoList={todoList}
      loadTodos={loadTodos}
      changeFilter={payload => changeFilter(payload)}
      changeTodoStatus={payload => changeTodoStatus(payload)}
      addNewTodo={payload => addNewTodo(payload)}
    />
  );
};

export default React.memo(TodoList);
