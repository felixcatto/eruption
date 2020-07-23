import React from 'react';
import { uniqueId } from 'lodash';
import { useMergedState, getTodos, filterStates, todoListStates } from '../lib/utils';
import CommonTodoList from '../components/CommonTodoList';

const TodoList = () => {
  const [state, setState] = useMergedState({
    todoList: [],
    todoListState: todoListStates.idle,
    filterState: filterStates.all,
  });
  const { filterState, todoListState, todoList } = state;
  console.log(state);

  const loadTodos = async ms => {
    setState({ todoListState: todoListStates.loading });
    getTodos(ms).then(items =>
      setState({ todoList: items, todoListState: todoListStates.success })
    );
  };
  const changeFilter = filterButtonState => setState({ filterState: filterButtonState });
  const changeTodoStatus = id => {
    const todo = todoList.find(el => el.id === id);
    todo.isCompleted = !todo.isCompleted;
    setState({ todoList });
  };
  const addNewTodo = text => {
    setState({
      todoList: todoList.concat({
        id: uniqueId(),
        text,
        isCompleted: false,
      }),
    });
  };

  return (
    <CommonTodoList
      filterState={filterState}
      todoListState={todoListState}
      todoList={todoList}
      loadTodos={loadTodos}
      changeFilter={changeFilter}
      changeTodoStatus={changeTodoStatus}
      addNewTodo={addNewTodo}
    />
  );
};

export default TodoList;
