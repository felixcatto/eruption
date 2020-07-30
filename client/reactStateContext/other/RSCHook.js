import React from 'react';
import { useMergedState } from '../../lib/utils';
import Crossroad from './Crossroad';

const useUsedHook = () => {
  const [state, setState] = useMergedState({
    usedValue: 'vasa',
    unusedValue: 'webpack',
  });
  const { usedValue, unusedValue } = state;

  const changeUsedValue = () => {
    const newValue = usedValue === 'vasa' ? 'fedya' : 'vasa';
    setState({ usedValue: newValue });
  };
  const changeUnusedValue = () => {
    const newValue = unusedValue === 'webpack' ? 'babel' : 'webpack';
    setState({ unusedValue: newValue });
  };

  return { state, changeUsedValue, changeUnusedValue };
};

const Middle = ({ children }) => {
  console.log('Middle');
  return <div>{children}</div>;
};

const Inner = () => {
  console.log('Inner');
  const { state, changeUsedValue, changeUnusedValue } = useUsedHook();
  const { usedValue, unusedValue } = state;

  return (
    <div>
      <div>usedValue: {usedValue}</div>
      <div>unusedValue: {unusedValue}</div>
      <div className="mt-10">
        <button className="btn btn-info mr-10" onClick={changeUsedValue}>
          Change usedValue
        </button>
        <button className="btn btn-info" onClick={changeUnusedValue}>
          Change unusedValue
        </button>
      </div>
    </div>
  );
};

const InnerSide = () => {
  console.log('InnerSide');
  const { state, changeUsedValue } = useUsedHook();
  const { usedValue } = state;

  return (
    <div className="mt-25">
      <div>usedValue: {usedValue}</div>
      <button className="btn btn-info mt-10" onClick={changeUsedValue}>
        Change usedValue
      </button>
    </div>
  );
};

const Outer = () => {
  console.log('Outer');

  return (
    <div>
      <Crossroad className="mb-20" />
      <Middle>
        <Inner />
        <InnerSide />
      </Middle>
    </div>
  );
};

export default Outer;
