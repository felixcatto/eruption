import React, { useContext, useMemo } from 'react';
import { OldContext } from './context';

const TodoList = props => {
  console.log('Context layer');
  const state = useContext(OldContext);
  console.log(state);

  return useMemo(() => {
    console.log('TodoList');
    console.log(props);
    const changeContextX = () => state.setContextState({ x: Math.random() });

    return (
      <div className="d-flex">
        <div className="mr-15 clickable" onClick={changeContextX}>
          Change USED context prop:
        </div>
        <div>{state.x}</div>
      </div>
    );
  }, [props.iprop, state.x]);
};

export default TodoList;
