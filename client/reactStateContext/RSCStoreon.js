import React, { useState } from 'react';
import { createStoreon } from 'storeon';
import { StoreContext, useStoreon } from 'storeon/react';
import Crossroad from './Crossroad';

const actions = {
  changeUsedValue: 'changeUsedValue',
  changeUnusedValue: 'changeUnusedValue',
};

const storeon = store => {
  store.on('@init', () => ({ usedValue: 'vasa', unusedValue: 'webpack' }));
  store.on(actions.changeUsedValue, state => ({
    usedValue: state.usedValue === 'vasa' ? 'fedya' : 'vasa',
  }));
  store.on(actions.changeUnusedValue, state => ({
    unusedValue: state.unusedValue === 'webpack' ? 'babel' : 'webpack',
  }));
};

const store = createStoreon([storeon]);

const Middle = ({ children }) => {
  console.log('Middle');
  return <div>{children}</div>;
};

const Inner = () => {
  console.log('Inner');
  const { dispatch, usedValue } = useStoreon('usedValue');

  return (
    <div>
      <div>usedValue: {usedValue}</div>
      <button className="btn btn-info mt-10" onClick={() => dispatch(actions.changeUsedValue)}>
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
  const { dispatch, unusedValue } = useStoreon('unusedValue');
  return (
    <div className="mt-25">
      <div>unusedValue: {unusedValue}</div>
      <button className="btn btn-info mt-10" onClick={() => dispatch(actions.changeUnusedValue)}>
        Change unusedValue
      </button>
    </div>
  );
};

const Outer = () => {
  console.log('Outer');

  return (
    <Crossroad>
      <StoreContext.Provider value={store}>
        <Middle>
          <Inner />
          <InnerSide />
        </Middle>
        {/*<MiddleSide />*/}
      </StoreContext.Provider>
    </Crossroad>
  );
};

export default Outer;
