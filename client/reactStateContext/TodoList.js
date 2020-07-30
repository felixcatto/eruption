import React from 'react';
import { connect } from './context';
import CommonTodoList from '../components/CommonTodoList';

const TodoList = props => {
  const { todoList, filterState, actions } = props;
  console.log({ todoList, filterState });

  return (
    <CommonTodoList
      filterState={filterState}
      todoListState={todoList.status}
      todoList={todoList.data}
      loadTodos={actions.loadTodos}
      changeFilter={actions.changeFilter}
      changeTodoStatus={actions.changeTodoStatus}
      addNewTodo={actions.addNewTodo}
    />
  );
};

export default connect(({ todoList, filterState, actions }) => ({
  todoList,
  filterState,
  actions,
}))(TodoList);
