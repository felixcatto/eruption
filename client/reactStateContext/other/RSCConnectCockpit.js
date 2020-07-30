import React from 'react';
import { isFunction } from 'lodash';
import Crossroad from './Crossroad';

const Context = React.createContext();

const Wrapper = React.memo(({ Component, ...props }) => <Component {...props} />);

const connect = mapStateToProps => Component => ownProps => {
  const { setContextState, ...contextState } = React.useContext(Context);
  const props = isFunction(mapStateToProps) ? mapStateToProps(contextState, ownProps) : {};

  return (
    <Wrapper {...ownProps} {...props} setContextState={setContextState} Component={Component} />
  );
};

class Provider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      usedValue: 'vasa',
      unusedValue: 'webpack',
      setContextState: this.setState.bind(this),
    };
  }

  render() {
    return <Context.Provider value={this.state}>{this.props.children}</Context.Provider>;
  }
}

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

const InnerSide = connect(({ usedValue }) => ({ usedValue }))(props => {
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

  return (
    <Provider>
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
