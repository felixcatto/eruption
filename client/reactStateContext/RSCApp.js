import React from 'react';
import TodoList from './TodoList';
import { Provider } from './context';
import Crossroad from './other/Crossroad';
import { actions, todoList, filterState } from './todolistSlice';

const RSCApp = () => {
  const store = {
    ...todoList,
    ...filterState,
    actions: { ...actions },
  };

  return (
    <Provider value={store}>
      <Crossroad className="mb-20" />
      <TodoList />
    </Provider>
  );
};

export default RSCApp;
