import React, { useState } from 'react';
import { NewContext } from './context';
import { useMergedState } from '../lib/utils';
import Crossroad from './Crossroad';

const Middle = ({ children }) => {
  console.log('Middle');
  return <div>{children}</div>;
};

const Inner = () => {
  console.log('Inner');
  const { setContextState, usedValue } = React.useContext(NewContext);
  const changeUsedValue = () => {
    const newValue = usedValue === 'vasa' ? 'fedya' : 'vasa';
    setContextState({ usedValue: newValue });
  };

  return (
    <div>
      <div>usedValue: {usedValue}</div>
      <button className="btn btn-info mt-10" onClick={changeUsedValue}>
        Change usedValue
      </button>
    </div>
  );
};

const MiddleSide = () => {
  console.log('MiddleSide');
  return <div></div>;
};

const InnerSide = () => {
  console.log('InnerSide');
  const { setContextState, unusedValue } = React.useContext(NewContext);
  const changeUnusedValue = () => {
    const newValue = unusedValue === 'webpack' ? 'babel' : 'webpack';
    setContextState({ unusedValue: newValue });
  };

  return (
    <div className="mt-25">
      <div>unusedValue: {unusedValue}</div>
      <button className="btn btn-info mt-10" onClick={changeUnusedValue}>
        Change unusedValue
      </button>
    </div>
  );
};

const Outer = () => {
  console.log('Outer');
  const [contextState, setContextState] = useMergedState({
    usedValue: 'vasa',
    unusedValue: 'webpack',
  });
  const { usedValue, unusedValue } = contextState;
  const store = {
    usedValue,
    unusedValue,
    setContextState,
  };

  return (
    <Crossroad>
      <NewContext.Provider value={store}>
        <Middle>
          <Inner />
          <InnerSide />
        </Middle>
        {/*<MiddleSide />*/}
      </NewContext.Provider>
    </Crossroad>
  );
};

export default Outer;
