import React from 'react';
import { createStoreon } from 'storeon';
import { StoreContext, useStoreon } from 'storeon/react';
import Crossroad from './Crossroad';

const actions = {
  changeUsedValue: 'changeUsedValue',
  changeUnusedValue: 'changeUnusedValue',
};

const storeon = store => {
  store.on('@init', () => ({ usedValue: 'vasa', unusedValue: 'webpack' }));
  store.on('@changed', () => console.log('\n'));
  store.on(actions.changeUsedValue, state => ({
    usedValue: state.usedValue === 'vasa' ? 'fedya' : 'vasa',
  }));
  store.on(actions.changeUnusedValue, state => ({
    unusedValue: state.unusedValue === 'webpack' ? 'babel' : 'webpack',
  }));
};

const Middle = ({ children }) => {
  console.log('Middle');
  return <div>{children}</div>;
};

const MiddleSide = () => {
  console.log('MiddleSide');
  return <div></div>;
};

const Inner = () => {
  console.log('Inner');
  const { dispatch, usedValue, unusedValue } = useStoreon('usedValue', 'unusedValue');

  return (
    <div>
      <div>usedValue: {usedValue}</div>
      <div>unusedValue: {unusedValue}</div>
      <div className="mt-10">
        <button className="btn btn-info mr-10" onClick={() => dispatch(actions.changeUsedValue)}>
          Change usedValue
        </button>
        <button className="btn btn-info" onClick={() => dispatch(actions.changeUnusedValue)}>
          Change unusedValue
        </button>
      </div>
    </div>
  );
};

const InnerSide = () => {
  console.log('InnerSide');
  const { dispatch, usedValue } = useStoreon('usedValue');
  return (
    <div className="mt-25">
      <div>usedValue: {usedValue}</div>
      <button className="btn btn-info mt-10" onClick={() => dispatch(actions.changeUsedValue)}>
        Change usedValue
      </button>
    </div>
  );
};

const Outer = () => {
  const store = createStoreon([storeon]);
  console.log('Outer');

  return (
    <StoreContext.Provider value={store}>
      <Crossroad className="mb-20" />
      <Middle>
        <Inner />
        <InnerSide />
      </Middle>
      <MiddleSide />
    </StoreContext.Provider>
  );
};

export default Outer;
