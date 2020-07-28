import React from 'react';
import { observer } from 'mobx-react-lite';
import { toJS } from 'mobx';
import CommonTodoList from '../components/CommonTodoList';
import { useMobxStore } from './context';

const TodoList = observer(() => {
  const { todoList, filterState } = useMobxStore();
  console.log({ todoList: toJS(todoList), filterState: toJS(filterState) });

  return (
    <CommonTodoList
      filterState={filterState.value}
      todoListState={todoList.status}
      todoList={todoList.data}
      loadTodos={todoList.loadTodos}
      changeFilter={filterState.changeFilter}
      changeTodoStatus={todoList.changeTodoStatus}
      addNewTodo={todoList.addNewTodo}
    />
  );
});

export default TodoList;
