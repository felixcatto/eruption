import { useLocalStore } from 'mobx-react-lite';
import React from 'react';
import { todoListStore, filterStateStore } from './todolistSlice';

const Context = React.createContext(null);

export const MobxProvider = ({ children }) => {
  const store = {
    todoList: useLocalStore(todoListStore),
    filterState: useLocalStore(filterStateStore),
  };
  return <Context.Provider value={store}>{children}</Context.Provider>;
};

export const useMobxStore = () => React.useContext(Context);
