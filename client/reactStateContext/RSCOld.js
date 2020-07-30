import React, { useState } from 'react';
import { useMergedState } from '../lib/utils';
import TodoList from './TodoList';
import { OldContext } from './context';
import Crossroad from './Crossroad';

const Wrapper = ({ children }) => <>{children}</>;

const Old = () => {
  const [contextState, setContextState] = useMergedState({
    x: 322,
    y: 'vasa eto boroda',
  });
  const [state, setState] = useState('webpack');

  const changeContextY = () =>
    setContextState({
      y: contextState.y === 'vasa eto boroda' ? 'ggwp lanaya' : 'vasa eto boroda',
    });

  const changeProp = () => setState(state === 'webpack' ? 'babel' : 'webpack');

  return (
    <Crossroad>
      <OldContext.Provider value={{ ...contextState, setContextState }}>
        <div className="d-flex">
          <div className="mr-15 clickable" onClick={changeContextY}>
            Change UNUSED context prop:
          </div>
          <div>{contextState.y}</div>
        </div>
        <div className="d-flex">
          <div className="mr-15 clickable" onClick={changeProp}>
            Change prop passed to TodoList:
          </div>
          <div>{state}</div>
        </div>
        <Wrapper>
          <TodoList iprop={state} />
        </Wrapper>
      </OldContext.Provider>
    </Crossroad>
  );
};

export default Old;
