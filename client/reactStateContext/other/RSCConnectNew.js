import React from 'react';
import { isFunction } from 'lodash';
import { useMergeState } from '../../lib/utils';
import Crossroad from './Crossroad';

const Context = React.createContext();

const Provider = ({ children, store }) => {
  const [contextState, setContextState] = useMergeState(store);

  return (
    <Context.Provider value={{ ...contextState, setContextState }}>{children}</Context.Provider>
  );
};

const connect = mapStateToProps => Component => ownProps => {
  const { setContextState, ...state } = React.useContext(Context);
  const props = isFunction(mapStateToProps) ? mapStateToProps(state, ownProps) : {};
  const newProps = {
    ...props,
    ...ownProps,
    setContextState,
  };

  return React.useMemo(() => <Component {...newProps} />, Object.values(newProps));
};

const Middle = function Middle({ children }) {
  console.log('Middle');
  return <div>{children}</div>;
};

const MiddleSide = function MiddleSide() {
  console.log('MiddleSide');
  return <div></div>;
};

const Inner = connect(({ usedValue, unusedValue }) => ({ usedValue, unusedValue }))(props => {
  console.log('Inner');
  const { setContextState, usedValue, unusedValue } = props;
  const changeUsedValue = () => {
    console.log('\n');
    const newValue = usedValue === 'vasa' ? 'fedya' : 'vasa';
    setContextState({ usedValue: newValue });
  };
  const changeUnusedValue = () => {
    console.log('\n');
    const newValue = unusedValue === 'webpack' ? 'babel' : 'webpack';
    setContextState({ unusedValue: newValue });
  };

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
});

const InnerSide = connect(state => ({ usedValue: state.usedValue }))(props => {
  console.log('InnerSide');
  const { setContextState, usedValue } = props;
  const changeUsedValue = () => {
    console.log('\n');
    const newValue = usedValue === 'vasa' ? 'fedya' : 'vasa';
    setContextState({ usedValue: newValue });
  };

  return (
    <div className="mt-25">
      <div>usedValue: {usedValue}</div>
      <button className="btn btn-info mt-10" onClick={changeUsedValue}>
        Change usedValue
      </button>
    </div>
  );
});

const Outer = () => {
  console.log('\nOuter');
  const store = {
    usedValue: 'vasa',
    unusedValue: 'webpack',
  };

  return (
    <Provider store={store}>
      <Crossroad className="mb-20" />
      <Middle>
        <Inner />
        <InnerSide />
      </Middle>
      <MiddleSide />
    </Provider>
  );
};

export default Outer;
