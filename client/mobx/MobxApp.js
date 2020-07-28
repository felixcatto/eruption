import React from 'react';
import 'mobx-react-lite/batchingForReactDom';
import TodoList from './TodoList';
import { MobxProvider } from './context';

const MobxApp = () => (
  <MobxProvider>
    <TodoList />
  </MobxProvider>
);

export default React.memo(MobxApp);
