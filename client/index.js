import './index.scss';
import React from 'react';
import { render } from 'react-dom';

const App = (props) => {
  return (
    <div className="container app__container">
      <div className="d-flex justify-content-between align-items-center pt-20">
        <h1>hello fedya</h1>
        <i className="fa fa-user"></i>
      </div>
    </div>
  );
};

render(<App />, document.getElementById('root'));
