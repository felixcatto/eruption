import React from 'react';
import 'mobx-react-lite/batchingForReactDom';
import { useLocalStore } from 'mobx-react-lite';
import TodoList from './TodoList';
import Context from './context';
import { todoListStore, filterStateStore } from './todolistSlice';

const MobxApp = () => {
  console.log('MobX: App');
  const store = {
    todoList: useLocalStore(todoListStore),
    filterState: useLocalStore(filterStateStore),
  };

  return (
    <Context.Provider value={store}>
      <TodoList />
    </Context.Provider>
  );
};

export default MobxApp;
