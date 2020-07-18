import React from 'react';
import { render } from 'react-dom';
import ReactStateInline from './reactStateInline/TodoList';
import './index.scss';

const App = props => {
  return (
    <div className="container app__container pt-20">
      <h1 className="mb-30">ToDo list App</h1>
      <ReactStateInline/>
    </div>
  );
};

render(<App />, document.getElementById('root'));
