import React from 'react';
import { uniqueId } from 'lodash';
import { getTodos, filterStates, asyncStates, useImmerState } from '../lib/utils';
import CommonTodoList from '../components/CommonTodoList';

const TodoList = () => {
  const [state, setState] = useImmerState({
    todoList: {
      data: [],
      status: asyncStates.idle,
      errors: null,
    },
    filterState: filterStates.all,
  });
  const { filterState, todoList } = state;
  console.log(state);

  const loadTodos = async ms => {
    setState(i => {
      i.todoList.data = [];
      i.todoList.status = asyncStates.pending;
      i.todoList.errors = null;
    });
    getTodos(ms).then(items =>
      setState(i => {
        i.todoList.data = items;
        i.todoList.status = asyncStates.resolved;
        i.todoList.errors = null;
      })
    );
  };

  const changeFilter = filterButtonState => setState({ filterState: filterButtonState });
  const changeTodoStatus = id =>
    setState(i => {
      const todo = i.todoList.data.find(el => el.id === id);
      todo.isCompleted = !todo.isCompleted;
    });
  const addNewTodo = text =>
    setState(i => {
      i.todoList.data.push({
        id: uniqueId(),
        text,
        isCompleted: false,
      });
    });

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
