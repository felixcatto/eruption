import React from 'react';
import { observer } from 'mobx-react-lite';
// import { toJS } from 'mobx';
import CommonTodoList from '../components/CommonTodoList';
import Context from './context';

const TodoList = observer(() => {
  const { todoList, filterState } = React.useContext(Context);
  // console.log({ todoList: toJS(todoList), filterState: toJS(filterState) });
  console.log('MobX: TodoList');

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
