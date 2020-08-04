import React from 'react';
import { observer, useLocalStore } from 'mobx-react-lite';
import { observable, toJS, transaction } from 'mobx';
import 'mobx-react-lite/batchingForReactDom';
import { uniqueId } from 'lodash';
import CommonTodoList from '../../components/CommonTodoList';
import { filterStates, asyncStates } from '../../lib/utils';
import api from '../../lib/api';

const MobxApp = observer(() => {
  const todoList = useLocalStore(() => ({
    data: [],
    status: asyncStates.idle,
    errors: null,
  }));
  const filterState = useLocalStore(() => observable.box(filterStates.all));
  console.log({ todoList: toJS(todoList), filterState: toJS(filterState) });

  const loadTodos = async ms => {
    todoList.data = [];
    todoList.status = asyncStates.pending;
    todoList.errors = null;

    const items = await api.todos.get(ms);
    transaction(() => {
      todoList.data = items;
      todoList.status = asyncStates.resolved;
      todoList.errors = null;
    });
  };

  const changeFilter = filterButtonState => filterState.set(filterButtonState);
  const changeTodoStatus = id => {
    const todo = todoList.data.find(el => el.id === id);
    todo.isCompleted = !todo.isCompleted;
  };
  const addNewTodo = text =>
    todoList.data.push({
      id: uniqueId(),
      text,
      isCompleted: false,
    });

  return (
    <CommonTodoList
      filterState={filterState.get()}
      todoListState={todoList.status}
      todoList={todoList.data}
      loadTodos={loadTodos}
      changeFilter={changeFilter}
      changeTodoStatus={changeTodoStatus}
      addNewTodo={addNewTodo}
    />
  );
});

export default MobxApp;
