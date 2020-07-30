import React, { useState } from 'react';
import { useMergedState } from '../lib/utils';
import Crossroad from './Crossroad';

const Middle = ({ children }) => {
  console.log('Middle');
  return <div>{children}</div>;
};

const Inner = () => {
  console.log('Inner');
  const { setContextState, usedValue } = { setContextState: () => {}, usedValue: '?' };
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

const InnerSide = () => {
  console.log('InnerSide');
  const { setContextState, unusedValue } = { setContextState: () => {}, unusedValue: '?' };
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

  return (
    <Crossroad>
      <Middle>
        <Inner />
        <InnerSide />
      </Middle>
    </Crossroad>
  );
};

export default Outer;
