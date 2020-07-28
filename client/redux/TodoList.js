import React from 'react';
import CommonTodoList from '../components/CommonTodoList';

const TodoList = props => {
  console.log(props);

  return (
    <CommonTodoList
      filterState={props.filterState}
      todoListState={props.todoList.status}
      todoList={props.todoList.data}
      loadTodos={props.loadTodos}
      changeFilter={props.changeFilter}
      changeTodoStatus={props.changeTodoStatus}
      addNewTodo={props.addNewTodo}
    />
  );
};

export default TodoList;
